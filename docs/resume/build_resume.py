"""Builds an ATS-friendly resume PDF: one column, real text in reading order, no header/footer, standard headings.

Run:  python docs/resume/build_resume.py
"""
from pathlib import Path

from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import HRFlowable, ListFlowable, ListItem, Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle

OUT = Path(__file__).with_name("Deep_Shah_Java_Backend_Developer_Resume.pdf")

FONTS = Path("C:/Windows/Fonts")
pdfmetrics.registerFont(TTFont("Body", str(FONTS / "calibri.ttf")))
pdfmetrics.registerFont(TTFont("Body-Bold", str(FONTS / "calibrib.ttf")))
pdfmetrics.registerFontFamily("Body", normal="Body", bold="Body-Bold", italic="Body", boldItalic="Body-Bold")

INK = HexColor("#1a1a1a")
ACCENT = HexColor("#2f7d4f")
MUTED = HexColor("#444444")

name = ParagraphStyle("name", fontName="Body-Bold", fontSize=22, leading=26, alignment=TA_CENTER, textColor=INK)
title = ParagraphStyle("title", fontName="Body-Bold", fontSize=11.5, leading=15, alignment=TA_CENTER, textColor=ACCENT)
contact = ParagraphStyle("contact", fontName="Body", fontSize=10, leading=13, alignment=TA_CENTER, textColor=MUTED)
h = ParagraphStyle("h", fontName="Body-Bold", fontSize=11.5, leading=14, textColor=INK, spaceBefore=5)
body = ParagraphStyle("body", fontName="Body", fontSize=10, leading=12.3, textColor=INK)
role = ParagraphStyle("role", fontName="Body-Bold", fontSize=11, leading=14, textColor=INK)
meta = ParagraphStyle("meta", fontName="Body", fontSize=10, leading=12.3, textColor=MUTED)
right = ParagraphStyle("right", parent=meta, alignment=2)
proj = ParagraphStyle("proj", fontName="Body-Bold", fontSize=10.2, leading=13, textColor=INK, spaceBefore=3)
bullet = ParagraphStyle("bullet", parent=body)

W = A4[0] - 30 * mm - 12  # frame has 6pt padding each side


def section(story, text):
    story.append(Paragraph(text.upper(), h))
    story.append(HRFlowable(width="100%", thickness=0.8, color=INK, spaceBefore=1, spaceAfter=4))


def two_col(left, right_text, lstyle=role):
    t = Table([[Paragraph(left, lstyle), Paragraph(right_text, right)]], colWidths=[W * 0.82, W * 0.18])
    t.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP"), ("LEFTPADDING", (0, 0), (-1, -1), 0),
                           ("RIGHTPADDING", (0, 0), (-1, -1), 0), ("TOPPADDING", (0, 0), (-1, -1), 0),
                           ("BOTTOMPADDING", (0, 0), (-1, -1), 1)]))
    return t


def bullets(items):
    return ListFlowable([ListItem(Paragraph(i, bullet), leftIndent=12, value="•") for i in items],
                        bulletType="bullet", start="•", leftIndent=12, bulletFontName="Body", bulletFontSize=9)


story = [
    Paragraph("DEEP SHAH", name),
    Paragraph("Java Backend Developer | Java, Spring Boot, AWS", title),
    Paragraph("Ahmedabad, Gujarat, India | +91 98986 69892 | shahdeep.1683@gmail.com", contact),
    Paragraph("linkedin.com/in/deepshah-java-developer | github.com/SHAHDEEP1683 | deeportfolio16.netlify.app", contact),
    Spacer(1, 2),
]

section(story, "Summary")
story.append(Paragraph(
    "Java Backend Developer with hands-on production experience building REST APIs and backend services with "
    "Java, Spring Boot, Spring Security, PostgreSQL, Redis and RabbitMQ, deployed on AWS with Terraform. "
    "Built booking, payment and payout workflows for an on-demand services platform and a biometric verification "
    "system used at examination centres. Focused on secure, reliable and maintainable backend design.", body))

section(story, "Technical Skills")
skills = [
    ("Languages &amp; Frameworks", "Java, Spring Boot, Spring Security, Spring MVC, Spring Data JPA, Hibernate, Maven, SQL"),
    ("Cloud &amp; DevOps", "AWS (EC2, EKS, S3, EBS, ACM, RDS, SES, Amazon MQ, ALB, CloudWatch, IAM, VPC, Route 53, Amplify), "
                           "Terraform, Docker, Kubernetes, Argo CD, GitHub Actions, CI/CD"),
    ("Databases", "PostgreSQL, MySQL, MongoDB"),
    ("Messaging &amp; Caching", "RabbitMQ, Apache Kafka, Redis"),
    ("Testing", "JUnit, Mockito, Spring Boot Test"),
    ("Tools", "Git, GitHub, IntelliJ IDEA, VS Code, Postman, Swagger / OpenAPI, Liquibase, Flyway, SonarQube, "
              "JasperReports, DBeaver, Claude Code"),
]
for label, value in skills:
    story.append(Paragraph(f"<b>{label}:</b> {value}", body))

section(story, "Work Experience")
story.append(two_col("Java Developer", "Aug 2025 – Present"))
story.append(Paragraph("Techxplore IT Solutions Pvt. Ltd., Ahmedabad, Gujarat", meta))

story.append(Paragraph("Fixie – On-Demand Home Services Platform", proj))
story.append(bullets([
    "Designed and developed REST APIs with Java and Spring Boot for customer and provider registration, provider "
    "discovery, service booking, pricing, booking acceptance and real-time booking tracking.",
    "Built provider payment, withdrawal and payout management by integrating banking APIs, using idempotent payment "
    "processing to prevent duplicate transactions.",
    "Implemented event-driven order and payment workflows with RabbitMQ, moving long-running steps to asynchronous "
    "processing to improve scalability and reliability.",
    "Secured services with Spring Security and role-based access control, using PostgreSQL for persistence and Redis "
    "for caching, following clean, layered architecture.",
    "Provisioned and deployed production infrastructure on AWS (EC2, RDS, Amazon MQ, SES, ALB) with Terraform to "
    "support high availability and repeatable releases.",
]))

story.append(Paragraph("Digi-Biometric – Examination Biometric Verification System", proj))
story.append(bullets([
    "Developed REST APIs with Java and Spring Boot for candidate management, biometric verification, exam centre "
    "and staff management, and attendance processing.",
    "Implemented secure authentication, role-based access control and candidate verification workflows.",
    "Built bulk data synchronisation using Amazon S3 pre-signed URLs for secure, efficient file upload and download "
    "between client applications and the server.",
    "Deployed and maintained production services on AWS, handling performance tuning and issue resolution.",
]))

story.append(Spacer(1, 4))
story.append(two_col("Java Developer Intern", "Dec 2024 – May 2025"))
story.append(Paragraph("BrightPeers Technology Solution Pvt. Ltd., Ahmedabad, Gujarat", meta))
story.append(Paragraph("Election Management System (team project, modelled on the New York State election process)", proj))
story.append(bullets([
    "Developed voter-side features including voter registration, profile management and election workflows.",
    "Designed and integrated REST APIs with Java and Spring Boot using layered architecture and DTO-based communication.",
    "Implemented data access with Spring Data JPA and Hibernate, including transaction management, validation and "
    "centralised exception handling.",
    "Applied Spring Security, design patterns and coding standards while collaborating with the development team.",
]))

section(story, "Education")
story.append(two_col("Master of Computer Applications (MCA) – Sardar Vallabhbhai Global University, Ahmedabad", "CGPA: 6.9", body))
story.append(two_col("Bachelor of Computer Applications (BCA) – Saurashtra University", "CGPA: 7.0", body))

section(story, "Certifications")
story.append(Paragraph("Spring Framework Essentials – Spring Academy | Core Java – HackerRank", body))

doc = SimpleDocTemplate(str(OUT), pagesize=A4, leftMargin=15 * mm, rightMargin=15 * mm, topMargin=9 * mm,
                        bottomMargin=9 * mm, title="Deep Shah – Java Backend Developer Resume", author="Deep Shah",
                        subject="Resume", keywords="Java, Spring Boot, AWS, Backend Developer, REST API")
doc.build(story)
print(OUT)
