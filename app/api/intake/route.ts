import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import { Resend } from "resend";
import { calculateQuote, formatQuote, type QuoteFormInput, SITE_TYPES, CONTENT_OPTIONS, LEAD_GEN, INTEGRATIONS, FEATURE_COMPLEXITY, TIMELINE_MULTIPLIERS, PAGE_SECTIONS, type QuoteResult } from "@/lib/quote";

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

async function sendQuoteEmail(
  body: any,
  quoteResult: QuoteResult,
  formattedQuote: string
) {
  // Check if API key is configured
  if (!process.env.RESEND_API_KEY) {
    console.warn("RESEND_API_KEY is not set. Email will not be sent.");
    return;
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  // Format contact information
  const contactInfo = [
    body.name && `Name: ${body.name}`,
    body.company && `Company: ${body.company}`,
    body.email && `Email: ${body.email}`,
    body.phone && `Phone: ${body.phone}`,
    body.website && `Website: ${body.website}`,
  ].filter(Boolean).join("\n");

  // Format project details
  const projectDetails: string[] = [];
  
  if (body.siteType) {
    const siteType = SITE_TYPES[body.siteType as keyof typeof SITE_TYPES];
    projectDetails.push(`Site Type: ${siteType?.label || body.siteType}`);
  }
  
  projectDetails.push(`Timeline: ${TIMELINE_MULTIPLIERS[body.timeline as keyof typeof TIMELINE_MULTIPLIERS]?.label || body.timeline}`);
  projectDetails.push(`Project Type: ${body.isRebuild ? "Rebuild" : "New Build"}`);
  
  if (body.launchDate) {
    projectDetails.push(`Launch Date: ${body.launchDate}`);
  }

  // Format pages
  const pagesInfo: string[] = [];
  if (!body.isRebuild && body.selectedPages?.length) {
    const pageLabels = body.selectedPages.map((key: string) => 
      PAGE_SECTIONS[key as keyof typeof PAGE_SECTIONS]?.label || key
    ).join(", ");
    pagesInfo.push(`Selected Pages: ${pageLabels}`);
    if (body.serviceDetailsCount) pagesInfo.push(`Service Details: ${body.serviceDetailsCount}`);
    if (body.caseStudyCount) pagesInfo.push(`Case Studies: ${body.caseStudyCount}`);
    if (body.courseCount) pagesInfo.push(`Courses: ${body.courseCount}`);
    if (body.productDetailsCount) pagesInfo.push(`Product Details: ${body.productDetailsCount}`);
  } else if (body.isRebuild) {
    if (body.selectedPagesToUpdate?.length) {
      const updateLabels = body.selectedPagesToUpdate.map((key: string) => 
        PAGE_SECTIONS[key as keyof typeof PAGE_SECTIONS]?.label || key
      ).join(", ");
      pagesInfo.push(`Pages to Update: ${updateLabels}`);
    }
    if (body.selectedPagesToAdd?.length) {
      const addLabels = body.selectedPagesToAdd.map((key: string) => 
        PAGE_SECTIONS[key as keyof typeof PAGE_SECTIONS]?.label || key
      ).join(", ");
      pagesInfo.push(`Pages to Add: ${addLabels}`);
    }
  }

  // Format content handling
  const contentHandlingKey = body.contentHandling as keyof typeof CONTENT_OPTIONS;
  const contentLabel = CONTENT_OPTIONS[contentHandlingKey]?.label || body.contentHandling;
  
  // Format type-specific details
  const typeSpecific: string[] = [];
  if (body.projectCount) typeSpecific.push(`Portfolio Projects: ${body.projectCount}`);
  if (body.productCount) typeSpecific.push(`Products: ${body.productCount}`);
  if (body.featureComplexity) {
    const complexity = FEATURE_COMPLEXITY[body.featureComplexity as keyof typeof FEATURE_COMPLEXITY];
    typeSpecific.push(`Feature Complexity: ${complexity?.label || body.featureComplexity}`);
  }

  // Format lead generation
  const leadGenTypeKey = body.leadGenType as keyof typeof LEAD_GEN;
  const leadGenLabel = LEAD_GEN[leadGenTypeKey]?.label || body.leadGenType;

  // Format integrations
  const integrationsList = body.integrations?.length
    ? body.integrations.map((key: string) => 
        INTEGRATIONS[key as keyof typeof INTEGRATIONS]?.label || key
      ).join(", ")
    : "None";

  // Format options
  const options: string[] = [];
  if (body.wantsCustomAnimations) options.push("Custom Animations");
  if (body.isBudgetConscious) options.push("Budget Conscious");
  if (body.wantsBrandKit) options.push("Brand Kit & Logo Design");

  // Format quote breakdown
  const breakdownList = quoteResult.breakdown
    .map(item => `  • ${item.label}: $${item.amount.toLocaleString()}`)
    .join("\n");

  // Build email content
  const emailHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; 
            line-height: 1.6; 
            color: #1a1a1a; 
            background-color: #f5f5f5;
            margin: 0;
            padding: 20px;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
          .header { 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: #ffffff;
            padding: 30px 20px;
            text-align: center;
          }
          .header h1 {
            margin: 0 0 10px 0;
            font-size: 24px;
            font-weight: 600;
          }
          .header p {
            margin: 0;
            opacity: 0.95;
            font-size: 14px;
          }
          .content {
            padding: 30px 20px;
          }
          .section { 
            margin: 25px 0;
            padding-bottom: 25px;
            border-bottom: 1px solid #e5e5e5;
          }
          .section:last-child {
            border-bottom: none;
          }
          .section-title { 
            font-weight: 600; 
            font-size: 16px; 
            margin-bottom: 12px; 
            color: #2c3e50;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            font-size: 12px;
          }
          .section-content {
            color: #4a4a4a;
            font-size: 14px;
          }
          .section-content ul {
            margin: 8px 0;
            padding-left: 20px;
          }
          .section-content li {
            margin: 6px 0;
          }
          .quote-total { 
            font-size: 32px; 
            font-weight: 700; 
            color: #27ae60; 
            margin: 20px 0;
            text-align: center;
            padding: 20px;
            background-color: #f0f9f4;
            border-radius: 6px;
          }
          .breakdown { 
            background-color: #f9f9f9; 
            padding: 20px; 
            border-radius: 6px;
            margin-top: 15px;
          }
          .breakdown-item { 
            margin: 8px 0;
            padding: 8px 0;
            border-bottom: 1px solid #e5e5e5;
          }
          .breakdown-item:last-child {
            border-bottom: none;
          }
          .info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            margin-top: 10px;
          }
          .info-item {
            font-size: 14px;
          }
          .info-label {
            font-weight: 600;
            color: #666;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 4px;
          }
          .contact-info {
            background-color: #f9f9f9;
            padding: 15px;
            border-radius: 6px;
            font-family: 'Monaco', 'Courier New', monospace;
            font-size: 13px;
            white-space: pre-wrap;
            line-height: 1.8;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Project Quote Request</h1>
            <p>You have received a new quote submission from your intake form</p>
          </div>
          <div class="content">

            <div class="section">
              <div class="section-title">Contact Information</div>
              <div class="section-content">
                <div class="contact-info">${contactInfo}</div>
              </div>
            </div>

            <div class="section">
              <div class="section-title">Project Overview</div>
              <div class="section-content">
                <ul>
                  ${projectDetails.map(detail => `<li>${detail}</li>`).join("\n                  ")}
                </ul>
              </div>
            </div>

            ${pagesInfo.length > 0 ? `
            <div class="section">
              <div class="section-title">Page Requirements</div>
              <div class="section-content">
                <ul>
                  ${pagesInfo.map(info => `<li>${info}</li>`).join("\n                  ")}
                </ul>
              </div>
            </div>
            ` : ""}

            <div class="section">
              <div class="section-title">Content Strategy</div>
              <div class="section-content">
                <p>${contentLabel}</p>
              </div>
            </div>

            ${typeSpecific.length > 0 ? `
            <div class="section">
              <div class="section-title">Project-Specific Requirements</div>
              <div class="section-content">
                <ul>
                  ${typeSpecific.map(detail => `<li>${detail}</li>`).join("\n                  ")}
                </ul>
              </div>
            </div>
            ` : ""}

            <div class="section">
              <div class="section-title">Lead Generation</div>
              <div class="section-content">
                <p>${leadGenLabel}</p>
              </div>
            </div>

            <div class="section">
              <div class="section-title">Third-Party Integrations</div>
              <div class="section-content">
                <p>${integrationsList}</p>
              </div>
            </div>

            ${options.length > 0 ? `
            <div class="section">
              <div class="section-title">Additional Services</div>
              <div class="section-content">
                <ul>
                  ${options.map(option => `<li>${option}</li>`).join("\n                  ")}
                </ul>
              </div>
            </div>
            ` : ""}

            ${body.extraNotes ? `
            <div class="section">
              <div class="section-title">Client Notes</div>
              <div class="section-content">
                <p>${body.extraNotes.replace(/\n/g, "<br>")}</p>
              </div>
            </div>
            ` : ""}

            <div class="section">
              <div class="section-title">Quote Summary</div>
              <div class="quote-total">${formattedQuote}</div>
              <div class="breakdown">
                <div class="section-title" style="margin-bottom: 15px;">Cost Breakdown</div>
                ${breakdownList.split("\n").map(item => `<div class="breakdown-item">${item}</div>`).join("")}
              </div>
              <div class="info-grid" style="margin-top: 20px;">
                <div class="info-item">
                  <div class="info-label">Platform</div>
                  <div>${quoteResult.meta.platformLabel}</div>
                </div>
                <div class="info-item">
                  <div class="info-label">Total Pages</div>
                  <div>${quoteResult.meta.totalPages}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;

  const emailText = `
NEW PROJECT QUOTE REQUEST
========================

You have received a new quote submission from your intake form.

CONTACT INFORMATION
-------------------
${contactInfo}

PROJECT OVERVIEW
----------------
${projectDetails.map(detail => `• ${detail}`).join("\n")}

${pagesInfo.length > 0 ? `\nPAGE REQUIREMENTS\n-----------------\n${pagesInfo.map(info => `• ${info}`).join("\n")}\n` : ""}
CONTENT STRATEGY
----------------
${contentLabel}

${typeSpecific.length > 0 ? `\nPROJECT-SPECIFIC REQUIREMENTS\n-----------------------------\n${typeSpecific.map(detail => `• ${detail}`).join("\n")}\n` : ""}
LEAD GENERATION
---------------
${leadGenLabel}

THIRD-PARTY INTEGRATIONS
------------------------
${integrationsList}

${options.length > 0 ? `\nADDITIONAL SERVICES\n-------------------\n${options.map(option => `• ${option}`).join("\n")}\n` : ""}
${body.extraNotes ? `\nCLIENT NOTES\n------------\n${body.extraNotes}\n\n` : ""}
QUOTE SUMMARY
=============

Total: ${formattedQuote}

Platform: ${quoteResult.meta.platformLabel}
Total Pages: ${quoteResult.meta.totalPages}

COST BREAKDOWN
--------------
${breakdownList}
  `.trim();

  try {
    // For Resend, you can use:
    // 1. "onboarding@resend.dev" for testing (works immediately, no setup needed)
    // 2. Your verified domain email (e.g., "noreply@yourdomain.com") for production
    // To verify a domain: Go to Resend dashboard > Domains > Add Domain
    const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
    
    console.log("Attempting to send email to justin@justinception.studio...");
    const result = await resend.emails.send({
      from: "noreply@quote.justinception.studio",
      to: "justin@justinception.studio",
      subject: `New Quote Request: ${formattedQuote} — ${body.name || body.company || "New Client"}`,
      html: emailHtml,
      text: emailText,
    });
    
    console.log("Email sent successfully:", result);
  } catch (error: any) {
    console.error("Failed to send email:", error);
    console.error("Error details:", {
      message: error?.message,
      name: error?.name,
      statusCode: error?.statusCode,
      response: error?.response,
    });
    // Don't throw - we don't want email failures to break the submission
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Calculate quote from submitted data
    // Platform will be determined automatically based on requirements
    const quoteInput: QuoteFormInput = {
      siteType: body.siteType || undefined,
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
      wantsBrandKit: body.wantsBrandKit || false,
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
      body.wantsBrandKit ? "Yes" : "No",
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

    // Send email notification with quote details
    await sendQuoteEmail(body, quoteResult, formattedQuote);

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


