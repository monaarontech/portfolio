const fs = require('fs');
const path = require('path');
const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  BorderStyle,
  Table,
  TableRow,
  TableCell,
  WidthType,
  AlignmentType,
  ExternalHyperlink,
} = require('docx');

const FONT_FAMILY = 'Calibri';
const COLOR_PRIMARY = '2B5C92';    // Royal Blue
const COLOR_ACCENT = 'A8421D';     // Terracotta
const COLOR_TITLE = '111827';      // Dark Charcoal
const COLOR_BODY = '1F2937';       // Body text
const COLOR_MUTED = '4B5563';      // Muted gray
const COLOR_SUBTLE = '2B5C92';     // Tech stack tag blue

function createSectionHeading(title) {
  return new Paragraph({
    spacing: { before: 140, after: 50 },
    border: {
      bottom: {
        color: COLOR_ACCENT,
        space: 2,
        style: BorderStyle.SINGLE,
        size: 12, // 1.5 pt
      },
    },
    children: [
      new TextRun({
        text: title.toUpperCase(),
        bold: true,
        font: FONT_FAMILY,
        size: 19, // 9.5 pt
        color: COLOR_PRIMARY,
        characterSpacing: 20,
      }),
    ],
  });
}

const doc = new Document({
  styles: {
    default: {
      document: {
        run: {
          font: FONT_FAMILY,
          size: 17, // 8.5 pt
          color: COLOR_BODY,
        },
        paragraph: {
          spacing: { line: 260 }, // 1.08 line height
        },
      },
    },
  },
  sections: [
    {
      properties: {
        page: {
          margin: {
            top: 576,    // 0.4 inch (~10mm)
            bottom: 576, // 0.4 inch
            left: 720,   // 0.5 inch (~12.7mm)
            right: 720,  // 0.5 inch
          },
        },
      },
      children: [
        // ================= HEADER =================
        new Paragraph({
          spacing: { before: 0, after: 20 },
          children: [
            new TextRun({
              text: 'MON AARON V. MARCELO',
              bold: true,
              font: FONT_FAMILY,
              size: 40, // 20 pt
              color: COLOR_PRIMARY,
              characterSpacing: 20,
            }),
          ],
        }),

        new Paragraph({
          spacing: { before: 0, after: 40 },
          children: [
            new TextRun({
              text: 'BSIT STUDENT | OJT APPLICANT \u2022 JUNIOR WEB DEVELOPER',
              bold: true,
              font: FONT_FAMILY,
              size: 20, // 10 pt
              color: COLOR_TITLE,
              characterSpacing: 10,
            }),
          ],
        }),

        new Paragraph({
          spacing: { before: 0, after: 20 },
          children: [
            new TextRun({
              text: 'Brgy. Atate, Palayan City, Nueva Ecija  \u2022  09123456789  \u2022  ',
              font: FONT_FAMILY,
              size: 17,
              color: COLOR_MUTED,
            }),
            new ExternalHyperlink({
              children: [
                new TextRun({
                  text: 'monaarontech@gmail.com',
                  font: FONT_FAMILY,
                  size: 17,
                  color: COLOR_PRIMARY,
                  underline: {},
                }),
              ],
              link: 'mailto:monaarontech@gmail.com',
            }),
          ],
        }),

        new Paragraph({
          spacing: { before: 0, after: 60 },
          children: [
            new TextRun({
              text: 'GitHub: ',
              bold: true,
              font: FONT_FAMILY,
              size: 17,
              color: COLOR_MUTED,
            }),
            new ExternalHyperlink({
              children: [
                new TextRun({
                  text: 'github.com/monaarontech',
                  font: FONT_FAMILY,
                  size: 17,
                  color: COLOR_PRIMARY,
                  underline: {},
                }),
              ],
              link: 'https://github.com/monaarontech',
            }),
            new TextRun({
              text: '  \u2022  Portfolio: ',
              bold: true,
              font: FONT_FAMILY,
              size: 17,
              color: COLOR_MUTED,
            }),
            new ExternalHyperlink({
              children: [
                new TextRun({
                  text: 'portfolio-seven-black-10.vercel.app',
                  font: FONT_FAMILY,
                  size: 17,
                  color: COLOR_PRIMARY,
                  underline: {},
                }),
              ],
              link: 'https://portfolio-seven-black-10.vercel.app',
            }),
          ],
        }),

        // ================= OBJECTIVE =================
        createSectionHeading('OBJECTIVE'),
        new Paragraph({
          alignment: AlignmentType.JUSTIFIED,
          spacing: { before: 20, after: 60 },
          children: [
            new TextRun({
              text: 'A motivated, proactive, and hardworking BSIT student seeking an On-the-Job Training (OJT) opportunity to gain practical industry experience and apply my knowledge in web development, system troubleshooting, and database architecture. Eager to learn new technologies, collaborate with development teams, solve technical challenges, and contribute productively in a real working environment.',
              font: FONT_FAMILY,
              size: 17,
              color: COLOR_BODY,
            }),
          ],
        }),

        // ================= EDUCATION =================
        createSectionHeading('EDUCATION'),
        new Paragraph({
          spacing: { before: 20, after: 10 },
          children: [
            new TextRun({
              text: 'Bachelor of Science in Information Technology \u2013 Web System Technology',
              bold: true,
              font: FONT_FAMILY,
              size: 18, // 9 pt
              color: COLOR_TITLE,
            }),
          ],
        }),
        new Paragraph({
          spacing: { before: 0, after: 10 },
          children: [
            new TextRun({
              text: '2023 \u2013 Present (Expected Graduation: 2027)',
              font: FONT_FAMILY,
              size: 17,
              color: COLOR_MUTED,
            }),
          ],
        }),
        new Paragraph({
          spacing: { before: 0, after: 10 },
          children: [
            new TextRun({
              text: 'NEUST \u2013 Nueva Ecija University of Science and Technology, Atate Campus',
              italics: true,
              font: FONT_FAMILY,
              size: 17,
              color: COLOR_MUTED,
            }),
          ],
        }),
        new Paragraph({
          spacing: { before: 0, after: 30 },
          children: [
            new TextRun({
              text: 'Palayan City, Nueva Ecija',
              font: FONT_FAMILY,
              size: 16.5,
              color: COLOR_MUTED,
            }),
          ],
        }),

        // Callout Award Box
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            new TableRow({
              children: [
                new TableCell({
                  shading: { fill: 'FDFAF3' },
                  borders: {
                    top: { style: BorderStyle.NONE },
                    bottom: { style: BorderStyle.NONE },
                    right: { style: BorderStyle.NONE },
                    left: { style: BorderStyle.SINGLE, size: 24, color: 'D97706' },
                  },
                  margins: {
                    top: 60,
                    bottom: 60,
                    left: 120,
                    right: 120,
                  },
                  children: [
                    new Paragraph({
                      spacing: { before: 0, after: 0 },
                      children: [
                        new TextRun({
                          text: 'Academic Distinction: ',
                          bold: true,
                          font: FONT_FAMILY,
                          size: 16.5,
                          color: '92400E',
                        }),
                        new TextRun({
                          text: 'Awarded ',
                          font: FONT_FAMILY,
                          size: 16.5,
                          color: COLOR_BODY,
                        }),
                        new TextRun({
                          text: 'Certificate of Academic Excellence',
                          bold: true,
                          font: FONT_FAMILY,
                          size: 16.5,
                          color: COLOR_TITLE,
                        }),
                        new TextRun({
                          text: ' for remarkable scholastic achievement with a ',
                          font: FONT_FAMILY,
                          size: 16.5,
                          color: COLOR_BODY,
                        }),
                        new TextRun({
                          text: 'General Weighted Average (GWA) of 1.55',
                          bold: true,
                          font: FONT_FAMILY,
                          size: 16.5,
                          color: '92400E',
                        }),
                        new TextRun({
                          text: ' (2nd Semester AY 2024\u20132025) \u2022 NEUST Honor Society.',
                          font: FONT_FAMILY,
                          size: 16.5,
                          color: COLOR_BODY,
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),

        // ================= PROJECTS =================
        createSectionHeading('PROJECTS'),

        // Project 1
        new Paragraph({
          spacing: { before: 40, after: 10 },
          indent: { left: 240, hanging: 240 },
          children: [
            new TextRun({ text: '\u2022  ', bold: true, font: FONT_FAMILY, size: 18, color: COLOR_TITLE }),
            new TextRun({
              text: 'One Palayan \u2013 Kalinga Hub (Capstone Project / Lead Full-Stack Developer)',
              bold: true,
              font: FONT_FAMILY,
              size: 17.5,
              color: COLOR_TITLE,
            }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.JUSTIFIED,
          spacing: { before: 0, after: 10 },
          indent: { left: 240 },
          children: [
            new TextRun({
              text: 'An enterprise municipal welfare web portal engineered for CSWDO Palayan City to streamline resident appointment scheduling, housing programs, and AICS crisis tracking. Evaluated under ISO/IEC 25010 standards with 847+ appointments served and \u20B11.2M+ in released citizen assistance.',
              font: FONT_FAMILY,
              size: 16.5,
              color: COLOR_BODY,
            }),
          ],
        }),
        new Paragraph({
          spacing: { before: 0, after: 30 },
          indent: { left: 240 },
          children: [
            new TextRun({
              text: 'Technologies: ',
              bold: true,
              font: FONT_FAMILY,
              size: 16,
              color: COLOR_SUBTLE,
            }),
            new TextRun({
              text: 'PHP 8, MySQL, JavaScript ES6+, AJAX, Server-Sent Events (SSE), Bootstrap',
              font: FONT_FAMILY,
              size: 16,
              color: COLOR_SUBTLE,
            }),
          ],
        }),

        // Project 2
        new Paragraph({
          spacing: { before: 20, after: 10 },
          indent: { left: 240, hanging: 240 },
          children: [
            new TextRun({ text: '\u2022  ', bold: true, font: FONT_FAMILY, size: 18, color: COLOR_TITLE }),
            new TextRun({
              text: 'University Student Government Voting System (Enhanced v2.0 Project)',
              bold: true,
              font: FONT_FAMILY,
              size: 17.5,
              color: COLOR_TITLE,
            }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.JUSTIFIED,
          spacing: { before: 0, after: 10 },
          indent: { left: 240 },
          children: [
            new TextRun({
              text: 'An automated campus election portal featuring real-time election state monitoring, role-based voting authorization, multi-position council ballot management (8 positions), and digital voter receipt issuance.',
              font: FONT_FAMILY,
              size: 16.5,
              color: COLOR_BODY,
            }),
          ],
        }),
        new Paragraph({
          spacing: { before: 0, after: 30 },
          indent: { left: 240 },
          children: [
            new TextRun({
              text: 'Technologies: ',
              bold: true,
              font: FONT_FAMILY,
              size: 16,
              color: COLOR_SUBTLE,
            }),
            new TextRun({
              text: 'Python, Web Engine, MySQL / SQLite, HTML5, CSS3, JavaScript',
              font: FONT_FAMILY,
              size: 16,
              color: COLOR_SUBTLE,
            }),
          ],
        }),

        // Project 3
        new Paragraph({
          spacing: { before: 20, after: 10 },
          indent: { left: 240, hanging: 240 },
          children: [
            new TextRun({ text: '\u2022  ', bold: true, font: FONT_FAMILY, size: 18, color: COLOR_TITLE }),
            new TextRun({
              text: 'Malupiton the Bird: Pygame Arcade (Game Development Project)',
              bold: true,
              font: FONT_FAMILY,
              size: 17.5,
              color: COLOR_TITLE,
            }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.JUSTIFIED,
          spacing: { before: 0, after: 10 },
          indent: { left: 240 },
          children: [
            new TextRun({
              text: 'A physics-driven 2D arcade recreation programmed from scratch in Python 3.12 and Pygame 2.6. Implements custom 60 FPS delta-time physics loops, AABB collision detection, and synthesized audio triggers.',
              font: FONT_FAMILY,
              size: 16.5,
              color: COLOR_BODY,
            }),
          ],
        }),
        new Paragraph({
          spacing: { before: 0, after: 40 },
          indent: { left: 240 },
          children: [
            new TextRun({
              text: 'Technologies: ',
              bold: true,
              font: FONT_FAMILY,
              size: 16,
              color: COLOR_SUBTLE,
            }),
            new TextRun({
              text: 'Python 3.12, Pygame 2.6, Object-Oriented Design (OOP), 2D Physics Engine',
              font: FONT_FAMILY,
              size: 16,
              color: COLOR_SUBTLE,
            }),
          ],
        }),

        // ================= WORK EXPERIENCE =================
        createSectionHeading('WORK EXPERIENCE'),

        // Experience 1
        new Paragraph({
          spacing: { before: 40, after: 10 },
          indent: { left: 240, hanging: 240 },
          children: [
            new TextRun({ text: '\u2022  ', bold: true, font: FONT_FAMILY, size: 18, color: COLOR_TITLE }),
            new TextRun({
              text: 'Lead Full-Stack Web Developer ',
              bold: true,
              font: FONT_FAMILY,
              size: 17.5,
              color: COLOR_TITLE,
            }),
            new TextRun({
              text: '\u2014 One Palayan-Kalinga Hub (CSWDO Palayan City) ',
              bold: true,
              font: FONT_FAMILY,
              size: 17,
              color: COLOR_BODY,
            }),
            new TextRun({
              text: '\u2014 (Capstone Deployment)',
              font: FONT_FAMILY,
              size: 16.5,
              color: COLOR_MUTED,
            }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.JUSTIFIED,
          spacing: { before: 0, after: 30 },
          indent: { left: 240 },
          children: [
            new TextRun({
              text: 'Collaborated with CSWDO social workers to evaluate administrative bottlenecks, architected normalized relational databases (3NF), and developed appointment workflows adhering to RA 10173 Data Privacy standards.',
              font: FONT_FAMILY,
              size: 16.5,
              color: COLOR_BODY,
            }),
          ],
        }),

        // Experience 2
        new Paragraph({
          spacing: { before: 20, after: 10 },
          indent: { left: 240, hanging: 240 },
          children: [
            new TextRun({ text: '\u2022  ', bold: true, font: FONT_FAMILY, size: 18, color: COLOR_TITLE }),
            new TextRun({
              text: 'Freelance Web Developer & Technical Support ',
              bold: true,
              font: FONT_FAMILY,
              size: 17.5,
              color: COLOR_TITLE,
            }),
            new TextRun({
              text: '\u2014 Self-Employed / Freelance ',
              bold: true,
              font: FONT_FAMILY,
              size: 17,
              color: COLOR_BODY,
            }),
            new TextRun({
              text: '\u2014 Palayan City, Nueva Ecija',
              font: FONT_FAMILY,
              size: 16.5,
              color: COLOR_MUTED,
            }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.JUSTIFIED,
          spacing: { before: 0, after: 40 },
          indent: { left: 240 },
          children: [
            new TextRun({
              text: 'Delivered customized responsive website layouts, debugged frontend interfaces, resolved database queries, and provided computer hardware and operating system troubleshooting support.',
              font: FONT_FAMILY,
              size: 16.5,
              color: COLOR_BODY,
            }),
          ],
        }),

        // ================= SEMINARS & TRAININGS =================
        createSectionHeading('SEMINARS & TRAININGS'),

        // Seminar 1
        new Paragraph({
          spacing: { before: 30, after: 5 },
          indent: { left: 240, hanging: 240 },
          children: [
            new TextRun({ text: '\u2022  ', bold: true, font: FONT_FAMILY, size: 18, color: COLOR_TITLE }),
            new TextRun({
              text: 'PRESS START: Game Development in Modern Era',
              bold: true,
              font: FONT_FAMILY,
              size: 17.5,
              color: COLOR_TITLE,
            }),
          ],
        }),
        new Paragraph({
          spacing: { before: 0, after: 5 },
          indent: { left: 240 },
          children: [
            new TextRun({
              text: 'DICT Regional Office VIII & IIDB \u2022 Credential ID: 2026-08-SAM-WB-01-OL-012 (August 17, 2026)',
              italics: true,
              font: FONT_FAMILY,
              size: 16,
              color: COLOR_MUTED,
            }),
          ],
        }),
        new Paragraph({
          spacing: { before: 0, after: 20 },
          indent: { left: 240 },
          children: [
            new TextRun({
              text: 'Gained foundational insights into game development workflows, indie game mechanics, and digital creative production.',
              font: FONT_FAMILY,
              size: 16.5,
              color: COLOR_BODY,
            }),
          ],
        }),

        // Seminar 2
        new Paragraph({
          spacing: { before: 15, after: 5 },
          indent: { left: 240, hanging: 240 },
          children: [
            new TextRun({ text: '\u2022  ', bold: true, font: FONT_FAMILY, size: 18, color: COLOR_TITLE }),
            new TextRun({
              text: 'How to Grow Your I.T. Career by Becoming CCNA',
              bold: true,
              font: FONT_FAMILY,
              size: 17.5,
              color: COLOR_TITLE,
            }),
          ],
        }),
        new Paragraph({
          spacing: { before: 0, after: 5 },
          indent: { left: 240 },
          children: [
            new TextRun({
              text: 'Tech Academy (Billy Ramirez IT Solutions) \u2022 Credential ID: YFNNAS-CE000213 / TAC-030826-6218 (August 1, 2026)',
              italics: true,
              font: FONT_FAMILY,
              size: 16,
              color: COLOR_MUTED,
            }),
          ],
        }),
        new Paragraph({
          spacing: { before: 0, after: 20 },
          indent: { left: 240 },
          children: [
            new TextRun({
              text: 'Learned core networking fundamentals, routing & switching essentials, subnetting protocols, and CCNA career pathways.',
              font: FONT_FAMILY,
              size: 16.5,
              color: COLOR_BODY,
            }),
          ],
        }),

        // Seminar 3
        new Paragraph({
          spacing: { before: 15, after: 5 },
          indent: { left: 240, hanging: 240 },
          children: [
            new TextRun({ text: '\u2022  ', bold: true, font: FONT_FAMILY, size: 18, color: COLOR_TITLE }),
            new TextRun({
              text: 'ICT Skills Training: Google Workspace',
              bold: true,
              font: FONT_FAMILY,
              size: 17.5,
              color: COLOR_TITLE,
            }),
          ],
        }),
        new Paragraph({
          spacing: { before: 0, after: 5 },
          indent: { left: 240 },
          children: [
            new TextRun({
              text: 'DICT Region III & ILCDB \u2022 Credential ID: 2026-08-PAM-WB-02-OL-381 (August 11, 2026)',
              italics: true,
              font: FONT_FAMILY,
              size: 16,
              color: COLOR_MUTED,
            }),
          ],
        }),
        new Paragraph({
          spacing: { before: 0, after: 20 },
          indent: { left: 240 },
          children: [
            new TextRun({
              text: 'Completed 3-hour competency training on enterprise Google Workspace cloud collaboration tools and digital workflows.',
              font: FONT_FAMILY,
              size: 16.5,
              color: COLOR_BODY,
            }),
          ],
        }),

        // Seminar 4
        new Paragraph({
          spacing: { before: 15, after: 5 },
          indent: { left: 240, hanging: 240 },
          children: [
            new TextRun({ text: '\u2022  ', bold: true, font: FONT_FAMILY, size: 18, color: COLOR_TITLE }),
            new TextRun({
              text: 'Introduction to AI for Business Advertising',
              bold: true,
              font: FONT_FAMILY,
              size: 17.5,
              color: COLOR_TITLE,
            }),
          ],
        }),
        new Paragraph({
          spacing: { before: 0, after: 5 },
          indent: { left: 240 },
          children: [
            new TextRun({
              text: 'DICT Region II & Quirino Provincial Office \u2022 Credential ID: ILCD_R2_ISDDL_2026_73 (August 6, 2026)',
              italics: true,
              font: FONT_FAMILY,
              size: 16,
              color: COLOR_MUTED,
            }),
          ],
        }),
        new Paragraph({
          spacing: { before: 0, after: 20 },
          indent: { left: 240 },
          children: [
            new TextRun({
              text: 'Explored artificial intelligence integration in digital advertising, automated content creation, and MSME growth strategies.',
              font: FONT_FAMILY,
              size: 16.5,
              color: COLOR_BODY,
            }),
          ],
        }),

        // Seminar 5
        new Paragraph({
          spacing: { before: 15, after: 5 },
          indent: { left: 240, hanging: 240 },
          children: [
            new TextRun({ text: '\u2022  ', bold: true, font: FONT_FAMILY, size: 18, color: COLOR_TITLE }),
            new TextRun({
              text: 'How to Grow Your Career with IT Certifications',
              bold: true,
              font: FONT_FAMILY,
              size: 17.5,
              color: COLOR_TITLE,
            }),
          ],
        }),
        new Paragraph({
          spacing: { before: 0, after: 5 },
          indent: { left: 240 },
          children: [
            new TextRun({
              text: 'Tech Academy (Billy Ramirez IT Solutions) \u2022 Credential ID: TAPH-CE000251 / TAC-020826-5867 (October 3, 2026)',
              italics: true,
              font: FONT_FAMILY,
              size: 16,
              color: COLOR_MUTED,
            }),
          ],
        }),
        new Paragraph({
          spacing: { before: 0, after: 40 },
          indent: { left: 240 },
          children: [
            new TextRun({
              text: 'Strategic webinar on global IT certification roadmaps, vendor qualifications, and professional career development.',
              font: FONT_FAMILY,
              size: 16.5,
              color: COLOR_BODY,
            }),
          ],
        }),

        // ================= SKILLS =================
        createSectionHeading('SKILLS'),
        new Paragraph({
          alignment: AlignmentType.JUSTIFIED,
          spacing: { before: 20, after: 30 },
          children: [
            new TextRun({
              text: 'I am a hardworking person who is always actively moving and hands-on when completing tasks. I can work well with others, manage my time responsibly, organize tasks, and adapt easily to new environments. I am eager to learn new technologies and continuously expand my knowledge in web systems and information technology. I approach problems patiently, think of practical solutions, and handle every responsibility with dedication.',
              font: FONT_FAMILY,
              size: 16.5,
              color: COLOR_BODY,
            }),
          ],
        }),

        new Paragraph({
          spacing: { before: 10, after: 10 },
          indent: { left: 240, hanging: 240 },
          children: [
            new TextRun({ text: '\u2022  ', bold: true, font: FONT_FAMILY, size: 17, color: COLOR_TITLE }),
            new TextRun({
              text: 'Programming & Web Technologies: ',
              bold: true,
              font: FONT_FAMILY,
              size: 16.5,
              color: COLOR_TITLE,
            }),
            new TextRun({
              text: 'PHP, JavaScript (ES6+), Python, HTML5, CSS3, SQL, TypeScript, Java, Tailwind CSS, Bootstrap, React, Next.js',
              font: FONT_FAMILY,
              size: 16.5,
              color: COLOR_BODY,
            }),
          ],
        }),

        new Paragraph({
          spacing: { before: 10, after: 10 },
          indent: { left: 240, hanging: 240 },
          children: [
            new TextRun({ text: '\u2022  ', bold: true, font: FONT_FAMILY, size: 17, color: COLOR_TITLE }),
            new TextRun({
              text: 'Databases & Architecture: ',
              bold: true,
              font: FONT_FAMILY,
              size: 16.5,
              color: COLOR_TITLE,
            }),
            new TextRun({
              text: 'MySQL, MariaDB, Relational Normalization (3NF), PDO, RESTful APIs, Server-Sent Events (SSE), XAMPP',
              font: FONT_FAMILY,
              size: 16.5,
              color: COLOR_BODY,
            }),
          ],
        }),

        new Paragraph({
          spacing: { before: 10, after: 20 },
          indent: { left: 240, hanging: 240 },
          children: [
            new TextRun({ text: '\u2022  ', bold: true, font: FONT_FAMILY, size: 17, color: COLOR_TITLE }),
            new TextRun({
              text: 'Tools & Methodologies: ',
              bold: true,
              font: FONT_FAMILY,
              size: 16.5,
              color: COLOR_TITLE,
            }),
            new TextRun({
              text: 'Git, GitHub, VS Code, Postman, Vercel, NetBeans, Pygame, Agile Scrum, ISO/IEC 25010 Quality Standards',
              font: FONT_FAMILY,
              size: 16.5,
              color: COLOR_BODY,
            }),
          ],
        }),
      ],
    },
  ],
});

async function main() {
  const publicDir = path.join(__dirname, '..', 'public');
  const buffer = await Packer.toBuffer(doc);
  
  const target1 = path.join(publicDir, 'Mon_Aaron_Marcelo_Resume.docx');
  const target2 = path.join(publicDir, 'resume.docx');
  
  fs.writeFileSync(target1, buffer);
  fs.writeFileSync(target2, buffer);
  
  // Also copy to user brain artifact directory
  const artifactDir = 'C:\\Users\\Grth_25\\.gemini\\antigravity\\brain\\a4593beb-e3ae-4f0d-9e7f-b81681754573';
  if (fs.existsSync(artifactDir)) {
    fs.writeFileSync(path.join(artifactDir, 'Mon_Aaron_Marcelo_Resume.docx'), buffer);
  }
  
  console.log('Successfully generated:');
  console.log(' - ' + target1);
  console.log(' - ' + target2);
  console.log('Size: ' + buffer.length + ' bytes');
}

main().catch(err => {
  console.error('Error generating docx:', err);
  process.exit(1);
});
