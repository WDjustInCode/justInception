import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import { calculateQuote, formatQuote, type QuoteFormInput } from "@/lib/quote";

async function getSheetsClient() {
  let privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;
  
  if (!privateKey) {
    throw new Error("Missing GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY");
  }

  // Remove surrounding quotes if present
  privateKey = privateKey.trim().replace(/^["']|["']$/g, '');
  
  // Handle both escaped newlines (\n) and actual newlines
  const formattedKey = privateKey.replace(/\\n/g, "\n");

  const auth = new google.auth.JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: formattedKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"]
  });

  await auth.authorize();

  return google.sheets({ version: "v4", auth });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Calculate quote from submitted data
    // Platform will be determined automatically based on requirements
    const quoteInput: QuoteFormInput = {
      siteType: body.siteType || "serviceBusiness",
      timeline: body.timeline || "standard",
      isRebuild: body.isRebuild || false,
      selectedPages: body.selectedPages,
      selectedPagesToUpdate: body.selectedPagesToUpdate,
      selectedPagesToAdd: body.selectedPagesToAdd,
      serviceDetailsCount: body.serviceDetailsCount ? parseInt(body.serviceDetailsCount) : undefined,
      caseStudyCount: body.caseStudyCount ? parseInt(body.caseStudyCount) : undefined,
      courseCount: body.courseCount ? parseInt(body.courseCount) : undefined,
      productDetailsCount: body.productDetailsCount ? parseInt(body.productDetailsCount) : undefined,
      // Legacy support
      totalPages: body.totalPages ? parseInt(body.totalPages) : undefined,
      updatedPages: body.updatedPages ? parseInt(body.updatedPages) : undefined,
      newPages: body.newPages ? parseInt(body.newPages) : undefined,
      contentHandling: body.contentHandling || "client",
      projectCount: body.projectCount ? parseInt(body.projectCount) : undefined,
      productCount: body.productCount ? parseInt(body.productCount) : undefined,
      featureComplexity: body.featureComplexity,
      leadGenType: body.leadGenType || "none",
      integrations: body.integrations || [],
      wantsCustomAnimations: body.wantsCustomAnimations || false,
      isBudgetConscious: body.isBudgetConscious || false,
    };

    const quoteResult = calculateQuote(quoteInput);
    const formattedQuote = formatQuote(quoteResult);

    const sheets = await getSheetsClient();

    const timestamp = new Date().toISOString();

    // Map to your sheet columns in order - all user inputs plus quote
    const row = [
      // Timestamp
      timestamp,
      // Contact Information
      body.name || "",
      body.company || "",
      body.email || "",
      body.phone || "",
      body.website || "",
      // Project Configuration
      body.siteType || "",
      body.timeline || "",
      body.isRebuild ? "Yes" : "No",
      body.launchDate || "",
      // Pages - New Build
      (body.selectedPages || []).join(", "),
      body.serviceDetailsCount || "",
      body.caseStudyCount || "",
      body.courseCount || "",
      body.productDetailsCount || "",
      // Pages - Rebuild
      (body.selectedPagesToUpdate || []).join(", "),
      (body.selectedPagesToAdd || []).join(", "),
      // Content
      body.contentHandling || "",
      // Type-Specific Counts
      body.projectCount || "",
      body.productCount || "",
      body.featureComplexity || "",
      // Lead Generation
      body.leadGenType || "",
      // Integrations
      (body.integrations || []).join(", "),
      // Options
      body.wantsCustomAnimations ? "Yes" : "No",
      body.isBudgetConscious ? "Yes" : "No",
      // Notes
      body.extraNotes || "",
      // Quote Results
      formattedQuote,
      quoteResult.total.toString(),
      quoteResult.meta.platformLabel || "",
      quoteResult.meta.siteTypeLabel || "",
      quoteResult.meta.timelineLabel || "",
      JSON.stringify(quoteResult.breakdown), // Full breakdown as JSON
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEETS_ID!,
      range: "Sheet1!A:Z", // change Sheet1 to your tab name if different
      valueInputOption: "RAW",
      requestBody: {
        values: [row],
      },
    });

    return NextResponse.json({ 
      ok: true,
      quote: {
        formatted: formattedQuote,
        breakdown: quoteResult,
      },
    });
  } catch (err) {
    console.error("Intake form error:", err);
    return new NextResponse("Error submitting form", { status: 500 });
  }
}


