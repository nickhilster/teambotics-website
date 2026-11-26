// Bill C-22 (Lawful Access Act, 2026) — tracker data for teambotics.app/c22
//
// AUTOMATED PAGE: this file is the ONLY file the daily C-22 check edits.
// Rules for updates (see the daily cron "c22-daily-update"):
//   - Keep entries newest first.
//   - Every entry needs a real source link a reader can open and check.
//   - Plain language. Say what happened, not what might happen.
//   - Update `lastChecked` on every check, even when nothing changed is NOT
//     required — only change this file when there is a real development, so
//     a push (and the Vercel build it triggers) only happens on news.
//   - Never state the bill is law unless LEGISinfo shows Royal Assent.

export interface C22Entry {
  /** ISO date, e.g. "2026-11-16" */
  date: string;
  /** Human date label, e.g. "November 16, 2026" */
  dateLabel: string;
  title: string;
  body: string;
  sourceLabel: string;
  sourceUrl: string;
}

export const c22Status = {
  headline: "Not law yet — Senate committee review is done, with amendments",
  body: "Bill C-22 has passed the House of Commons and second reading in the Senate. The Standing Senate Committee on National Security, Defence and Veterans Affairs finished its clause-by-clause review on November 25, adopting amendments over two days; LEGISinfo still lists the bill as at consideration in committee in the Senate, with report stage and third reading not yet reached. The bill now proceeds to a final vote in the Senate, and because the Senate changed it, it will then return to the House of Commons for the government to respond to those amendments. Until both chambers agree on the exact same text and the bill receives Royal Assent, none of it is in force — nothing in this bill is the law today.",
  lastChecked: "November 26, 2026",
  sourceLabel: "Parliament of Canada — LEGISinfo, Bill C-22 (45-1)",
  sourceUrl: "https://www.parl.ca/legisinfo/en/bill/45-1/c-22",
};

export const c22NextSteps: string[] = [
  "The committee's report is presented in the Senate, and the Senate holds its report stage and third-reading (final) vote on the amended bill.",
  "The bill returns to the House of Commons, where the government responds to the Senate's amendments — the House has to agree to the exact same text.",
  "The bill receives Royal Assent and becomes law. Part 1 would then take effect 180 days later.",
];

export const c22Entries: C22Entry[] = [
  {
    date: "2026-11-25",
    dateLabel: "November 25, 2026",
    title: "Senate committee finishes clause-by-clause and adopts more safeguards",
    body: "The Senate committee concluded its clause-by-clause review of Bill C-22 on November 25. Building on the amendments adopted the day before, senators adopted additional safeguards requiring the Minister to weigh the public interest in disclosing information about ministerial orders against the need for confidentiality, and strengthening technical expert consultation on those orders. Other proposals did not pass: the committee defeated measures that would have added greater transparency around secret ministerial orders, restricted mandatory metadata retention, and strengthened safeguards when service providers are compelled to assist law enforcement. The bill will now proceed to a final vote in the Senate before returning to the House of Commons, where the government will have the opportunity to respond to the Senate's amendments. LEGISinfo still lists the bill as at consideration in committee in the Senate.",
    sourceLabel: "Chamber of Progress — Senate Committee Strengthens Bill C-22 (Nov 25, 2026)",
    sourceUrl: "https://progresschamber.org/news/senate-committee-strengthens-bill-c-22/",
  },
  {
    date: "2026-11-24",
    dateLabel: "November 24, 2026",
    title: "Senate committee adopts first amendments in clause-by-clause review",
    body: "The Senate committee began going through Bill C-22 section by section and adopted several amendments on its first evening. The changes clarify that a “systemic vulnerability” includes the risks of removing, circumventing or weakening electronic protections such as encryption; remove the government's power to compel core providers to install equipment under subsection 5(2); add necessity and proportionality safeguards of the kind the Privacy Commissioner recommended; and require a way for the Minister to consult technical experts before finalizing regulations, including on whether they could create systemic vulnerabilities. One amendment did not pass: Senator Colin Deacon's proposal to stop the government from compelling companies to retain metadata they do not otherwise collect was defeated. Clause-by-clause review is not finished — the committee resumes on November 25 — and it has still not reported back to the Senate. LEGISinfo still lists the bill as at consideration in committee in the Senate.",
    sourceLabel: "Chamber of Progress — Senate Committee Takes Positive Steps to Strengthen Bill C-22 (Nov 24, 2026)",
    sourceUrl: "https://progresschamber.org/news/senate-committee-takes-positive-steps-to-strengthen-bill-c-22/",
  },
  {
    date: "2026-11-23",
    dateLabel: "November 23, 2026",
    title: "Final witness hearing: Apple, Google and Windscribe face senators",
    body: "The Senate committee held its final witness hearing on Bill C-22, with three panels in one afternoon. Senators heard from Australian Home Affairs officials — Australia passed a similar lawful-access law in 2018 — and from Tufts University computer-science professor Susan Landau and the Digital Governance Council. A second panel brought former Ontario Superior Court judge Michael Code, privacy lawyer David Fraser and the Canadian Bar Association. The last panel was the companies: Apple, Google Canada, Toronto-based VPN provider Windscribe and the Canadian Chamber of Commerce. That ends the witness phase: the committee's next meeting, on Tuesday, November 24 at 2:15 p.m. ET, is clause-by-clause consideration, where senators go through the bill section by section and can propose amendments. The committee has still not reported back to the Senate, and LEGISinfo still lists the bill as at consideration in committee in the Senate.",
    sourceLabel: "Senate of Canada — SECD Committee, Meeting 33 (Nov 23, 2026)",
    sourceUrl: "https://sencanada.ca/en/committees/SECD/noticeofmeeting/708538/45-1",
  },
  {
    date: "2026-11-19",
    dateLabel: "November 19, 2026",
    title: "26 civil-society groups ask the Prime Minister to step in on Bill C-22",
    body: "OpenMedia and 25 other civil-liberties, refugee-rights and privacy organizations and experts delivered a joint letter to Prime Minister Mark Carney asking him to intercede while the Senate studies the bill. They say the Senate committee is hearing its final round of witnesses before considering amendments and a final vote, which may occur before its December recess. The letter asks the Prime Minister to direct the government's representative in the Senate to bring forward two amendments: remove the power to require companies to retain metadata on all users, and forbid any regulation or secret ministerial order that would require a provider to access, intercept or circumvent end-to-end encrypted communications. It also says those obligations should be subject to judicial authorization and public by default. The committee has still not reported back to the Senate.",
    sourceLabel: "OpenMedia — Civil Society to Carney: Intercede on Bill C-22 before it's too late (Nov 19, 2026)",
    sourceUrl: "https://openmedia.org/press/item/civil-society-to-carney-intercede-on-bill-c-22-before-its-too-late",
  },
  {
    date: "2026-11-18",
    dateLabel: "November 18, 2026",
    title: "Senate committee hears from police and child-protection witnesses",
    body: "After Monday's hearing with tech companies and privacy advocates, the committee's next hearing heard from police and child-protection witnesses. The November 18 witness list included Commissioner Thomas Carrique for the Canadian Association of Chiefs of Police, the presidents of the Canadian Police Association and the National Police Federation, Lianna McDonald and Lloyd Richardson from the Canadian Centre for Child Protection, and representatives of the Ontario Child Sexual Exploitation Investigators Association, nCourage, Chayn and Cyber Harassment Support. The committee is still studying the bill and has not reported back to the Senate yet.",
    sourceLabel: "Senate of Canada — SECD Committee, Meeting 32 (Nov 18, 2026)",
    sourceUrl: "https://sencanada.ca/en/committees/SECD/Meeting/32/45-1",
  },
  {
    date: "2026-11-16",
    dateLabel: "November 16, 2026",
    title: "Meta tells senators it could pull encrypted services from Canada",
    body: "At the Senate committee's biggest hearing yet, Meta said it is not technically possible to comply with the bill as written and still offer secure end-to-end encrypted services — and that it would have to “consider” pulling those services, like WhatsApp, from Canada if the bill passes unchanged. Signal's witness said Signal would leave rather than compromise its users. The same hearing heard from Michael Geist, the Canadian Civil Liberties Association, Citizen Lab, OpenMedia and Tailscale.",
    sourceLabel: "CBC News reporting, via iPhone in Canada — Nov 17, 2026",
    sourceUrl:
      "https://www.iphoneincanada.ca/2026/11/17/meta-warns-whatsapp-could-leave-canada-over-spy-bill/",
  },
  {
    date: "2026-11-02",
    dateLabel: "November 2, 2026",
    title: "Privacy Commissioner asks the Senate for five more changes",
    body: "Privacy Commissioner Philippe Dufresne told the committee the bill's goals are important and the current version is a significant improvement — but still asked for five further amendments, starting with a narrower definition of “subscriber information” and tighter limits on who can be ordered to hand it over. That matters because the bill's new production order works on the lower “reasonable grounds to suspect” test, and as drafted it could reach far beyond phone companies — the Commissioner named healthcare providers, lawyers, financial institutions and dating apps.",
    sourceLabel: "Office of the Privacy Commissioner of Canada — statement to the committee",
    sourceUrl:
      "https://www.priv.gc.ca/en/opc-actions-and-decisions/advice-to-parliament/2026/parl_261102/",
  },
  {
    date: "2026-10-22",
    dateLabel: "October 22, 2026",
    title: "Senate passes second reading and sends the bill to committee",
    body: "The Senate agreed to the bill in principle at second reading and sent it to the Standing Senate Committee on National Security, Defence and Veterans Affairs for detailed study. Parliament's official tracker, LEGISinfo, lists the current status as “At consideration in committee in the Senate,” with report stage and third reading not yet reached and no Royal Assent.",
    sourceLabel: "Parliament of Canada — LEGISinfo, Bill C-22 (45-1)",
    sourceUrl: "https://www.parl.ca/legisinfo/en/bill/45-1/c-22",
  },
  {
    date: "2026-06-18",
    dateLabel: "June 18, 2026",
    title: "House of Commons passes the bill — with amendments",
    body: "The House committee reported the bill back with amendments, and the House passed it at third reading the same day. The amendments softened the original bill in real ways: the maximum time companies could be ordered to keep metadata fell from one year to six months, ministerial orders were capped at two years and made subject to Intelligence Commissioner approval, and the text was clarified so providers cannot be forced to decrypt information unless they supplied the encryption and hold the key. The bill went to the Senate the same day.",
    sourceLabel: "Parliament of Canada — Bill C-22, as passed by the House of Commons",
    sourceUrl: "https://www.parl.ca/documentviewer/en/45-1/bill/C-22/third-reading",
  },
  {
    date: "2026-04-20",
    dateLabel: "April 20, 2026",
    title: "House passes second reading; committee study begins",
    body: "MPs approved the bill in principle and sent it to the House Standing Committee on Public Safety and National Security (SECU), which heard witnesses and made the amendments adopted in June.",
    sourceLabel: "Parliament of Canada — LEGISinfo, Bill C-22 (45-1)",
    sourceUrl: "https://www.parl.ca/legisinfo/en/bill/45-1/c-22",
  },
  {
    date: "2026-03-12",
    dateLabel: "March 12, 2026",
    title: "Bill C-22 is introduced: the Lawful Access Act, 2026",
    body: "Public Safety Minister Gary Anandasangaree tabled Bill C-22 as a standalone bill. Part 1 (“Timely Access to Data and Information”) amends the Criminal Code and the CSIS Act: police could demand that a telecom provider confirm — without a judge's order — whether a person is its subscriber, and could get a judge-ordered production order for fuller subscriber information on the lower “reasonable grounds to suspect” test. Part 2 creates a new law, the Supporting Authorized Access to Information Act, under which the minister can order electronic service providers to build and keep the technical ability to hand over information, and regulations can require core providers to retain metadata.",
    sourceLabel: "Fasken — “The Government of Canada introduces Bill C-22”",
    sourceUrl:
      "https://www.fasken.com/en/knowledge/2026/03/the-government-of-canada-introduces-bill-c22",
  },
  {
    date: "2025-10-01",
    dateLabel: "Late 2025",
    title: "Lawful access is split out of the border bill",
    body: "After sustained criticism of the lawful-access parts of Bill C-2 from civil-liberties groups, privacy advocates and opposition parties, the government moved the border and immigration measures forward separately as Bill C-12 — without the lawful-access parts — and consulted on a revised, standalone lawful-access bill. That revised bill became C-22.",
    sourceLabel: "Fasken — “The Government of Canada introduces Bill C-22”",
    sourceUrl:
      "https://www.fasken.com/en/knowledge/2026/03/the-government-of-canada-introduces-bill-c22",
  },
  {
    date: "2025-06-03",
    dateLabel: "June 3, 2025",
    title: "Where this started: Bill C-2, the Strong Borders Act",
    body: "The government first tabled these ideas inside a large omnibus border bill. Parts 14 and 15 of Bill C-2 contained the original lawful-access regime — broader than today's version, including warrantless information demands that could be directed at any person who provides services to the public. Those two parts are the direct ancestors of Bill C-22.",
    sourceLabel: "Fasken — “Bill C-2: Strong Borders Act introduces lawful access regime”",
    sourceUrl:
      "https://www.fasken.com/en/knowledge/2025/06/bill-c2-strong-borders-act-introduces-lawful-access-and-data-disclosure-regime",
  },
];
