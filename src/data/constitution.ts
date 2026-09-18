export interface ConstitutionArticle {
  number: number
  title: string
  sections: {
    clause?: string
    text: string
    subsections?: { clause: string; text: string }[]
  }[]
}

export const constitutionArticles: ConstitutionArticle[] = [
  {
    number: 1,
    title: 'Name, Abbreviation, and Headquarters',
    sections: [
      { clause: '1.1', text: 'The organization shall be known as the All Africa Young Political Leaders Organization.' },
      { clause: '1.2', text: 'The abbreviation of the organization shall be AAYPL.' },
      { clause: '1.3', text: 'The headquarters of AAYPL shall be at such location as may be determined by the Board of Trustees from time to time.' },
      { clause: '1.4', text: 'AAYPL may establish secretariats, offices, regional offices, and representative offices across Africa and internationally as may be necessary for the pursuit of its objectives.' },
    ],
  },
  {
    number: 2,
    title: 'Nature and Status',
    sections: [
      { clause: '2.1', text: 'AAYPL is a continental, non-governmental, and non-partisan organization.' },
      { clause: '2.2', text: 'AAYPL is not affiliated with, and does not represent, any political party, government, or religious body.' },
      { clause: '2.3', text: 'AAYPL is committed to the principles of democratic governance, the rule of law, and the peaceful participation of young people in political and public life.' },
      { clause: '2.4', text: 'AAYPL operates across all 54 recognized member states of the African Union.' },
      { clause: '2.5', text: 'AAYPL shall operate in compliance with applicable national laws in every country where it establishes a presence.' },
    ],
  },
  {
    number: 3,
    title: 'Motto and Symbol',
    sections: [
      { clause: '3.1', text: 'The motto of AAYPL shall be: "Unity, Leadership, Integrity and Service."' },
      { clause: '3.2', text: 'AAYPL shall have an official symbol, seal, flag, and other identifying marks as may be adopted by the Board of Trustees.' },
      { clause: '3.3', text: 'The use of AAYPL\'s official marks shall be regulated in accordance with policies adopted by the Board of Trustees.' },
    ],
  },
  {
    number: 4,
    title: 'Vision',
    sections: [
      { clause: '4.1', text: 'The vision of AAYPL is to build a generation of ethical, competent, visionary, and responsible young African leaders committed to peace, democracy, good governance, development, and African unity.' },
    ],
  },
  {
    number: 5,
    title: 'Mission',
    sections: [
      { clause: '5.1', text: 'The mission of AAYPL is to provide a platform through which young political leaders can develop leadership capacity, exchange ideas, participate constructively in public affairs, and contribute to the sustainable development of Africa.' },
    ],
  },
  {
    number: 6,
    title: 'Objectives',
    sections: [
      { clause: '6.1', text: 'The objectives of AAYPL are:' },
      { clause: '6.1.1', text: 'To promote, identify, and support young African leaders committed to democratic governance and ethical leadership.' },
      { clause: '6.1.2', text: 'To strengthen democratic values, institutions, constitutionalism, and the rule of law among young African leaders.' },
      { clause: '6.1.3', text: 'To encourage the constructive and peaceful participation of young people in political and public life.' },
      { clause: '6.1.4', text: 'To build the leadership capacity of young Africans through training, workshops, mentorship, exchanges, and dialogue programmes.' },
      { clause: '6.1.5', text: 'To promote unity, solidarity, and cooperation among young African leaders across national, regional, and cultural boundaries.' },
      { clause: '6.1.6', text: 'To support gender equality, inclusion, and the representation of young women, persons with disabilities, and marginalized groups in leadership.' },
      { clause: '6.1.7', text: 'To promote political tolerance, peaceful coexistence, conflict prevention, and the peaceful resolution of political differences.' },
      { clause: '6.1.8', text: 'To encourage the contribution of young African leaders to sustainable social, economic, and technological development.' },
      { clause: '6.1.9', text: 'To build a continental network of young African political and public leaders committed to collective progress.' },
      { clause: '6.1.10', text: 'To promote ethical leadership, integrity, accountability, transparency, and responsible public service.' },
    ],
  },
  {
    number: 7,
    title: 'Principles',
    sections: [
      { clause: '7.1', text: 'AAYPL shall be guided in all its activities and in the conduct expected of its members by the following principles:' },
      { clause: '7.1.1', text: 'Integrity — Unwavering commitment to honesty and moral uprightness.' },
      { clause: '7.1.2', text: 'Accountability — Responsibility to members, the public, and the continent for all decisions and actions.' },
      { clause: '7.1.3', text: 'Transparency — Open and clear communication in all organizational processes and decision-making.' },
      { clause: '7.1.4', text: 'Democracy — Respect for democratic principles in governance.' },
      { clause: '7.1.5', text: 'Rule of Law — Respect for the law, constitutional order, and established legal processes.' },
      { clause: '7.1.6', text: 'Peaceful Political Engagement — Commitment to peaceful dialogue and non-violent participation in political processes.' },
      { clause: '7.1.7', text: 'African Unity — Dedication to continental solidarity and pan-African ideals.' },
      { clause: '7.1.8', text: 'Inclusiveness — Ensuring that all Africans, regardless of background, can participate in leadership.' },
      { clause: '7.1.9', text: 'Equality — Equal rights, equal treatment, and equal opportunity for all members and all Africans.' },
      { clause: '7.1.10', text: 'Human Dignity — Respect for the inherent dignity and worth of every human being.' },
      { clause: '7.1.11', text: 'Service — A genuine commitment to serving the African people and the public good.' },
      { clause: '7.1.12', text: 'Responsible Leadership — Leadership exercised with care, competence, and a long-term view of impact.' },
      { clause: '7.1.13', text: 'Youth Empowerment — Prioritizing the development and empowerment of young Africans.' },
      { clause: '7.1.14', text: 'Professionalism — Maintaining high standards of conduct, competence, and organizational excellence.' },
      { clause: '7.1.15', text: 'Respect for Diversity — Celebrating and respecting Africa\'s rich diversity of peoples, cultures, and perspectives.' },
    ],
  },
  {
    number: 8,
    title: 'Membership',
    sections: [
      { clause: '8.1', text: 'Membership of AAYPL shall be open to young Africans who subscribe to the objectives, principles, and constitution of the organization.' },
      { clause: '8.2', text: 'AAYPL shall have the following categories of membership: Founding Members, Ordinary Members, Associate Members, Honorary Members, and Institutional/Partner Members.' },
      { clause: '8.3', text: 'Founding Members are those who join AAYPL during its founding period and fulfil the qualifying criteria as determined by the Board of Trustees.' },
      { clause: '8.4', text: 'Ordinary Members are those who join AAYPL after the founding period and meet the applicable membership criteria.' },
      { clause: '8.5', text: 'Associate Members are those who support the mission and values of AAYPL but do not fully qualify for ordinary membership, subject to conditions to be defined in the Membership Regulations.' },
      { clause: '8.6', text: 'Honorary Members are distinguished persons conferred honorary membership by AAYPL\'s governing bodies in recognition of outstanding contributions to the organization\'s mission or to African leadership.' },
      { clause: '8.7', text: 'Institutional/Partner Members are organisations, institutions, and bodies admitted as institutional members in accordance with criteria established by the Board of Trustees.' },
      { clause: '8.8', text: 'Membership rights, privileges, fees, and obligations shall be governed by this Constitution and any Membership Regulations adopted pursuant hereto.' },
      { clause: '8.9', text: 'Membership may be terminated by resignation, non-payment of dues, or disciplinary action in accordance with the provisions of this Constitution.' },
    ],
  },
  {
    number: 9,
    title: 'Organizational Structure',
    sections: [
      { clause: '9.1', text: 'AAYPL shall operate through the following organs:' },
      { clause: '9.1.1', text: 'The General Assembly — the supreme decision-making body of AAYPL, comprising all members in good standing.' },
      { clause: '9.1.2', text: 'The Board of Trustees — the governance and oversight body responsible for constitutional compliance, strategic oversight, and accountability.' },
      { clause: '9.1.3', text: 'The Continental Executive Council — the executive organ responsible for day-to-day management and programme delivery.' },
      { clause: '9.1.4', text: 'Regional Councils — five regional structures covering North, West, East, Central, and Southern Africa.' },
      { clause: '9.1.5', text: 'National Chapters — bodies established in each member country in accordance with this Constitution.' },
      { clause: '9.1.6', text: 'State/Provincial Chapters — bodies established at subnational levels in countries where AAYPL is active.' },
      { clause: '9.1.7', text: 'Local/Community Chapters — bodies established at local and community levels.' },
      { clause: '9.2', text: 'Chapters at all levels shall be established in accordance with the procedures set out in this Constitution and any regulations made under it.' },
    ],
  },
  {
    number: 10,
    title: 'Board of Trustees',
    sections: [
      { clause: '10.1', text: 'The Board of Trustees shall be the highest governance organ of AAYPL, responsible for providing strategic oversight, constitutional compliance, and institutional accountability.' },
      { clause: '10.2', text: 'The Board of Trustees shall consist of a Chairman, a Vice Chairman, Trustees, and a Legal/Constitutional Adviser.' },
      { clause: '10.3', text: 'Members of the Board of Trustees shall be persons of recognized integrity, professional achievement, and commitment to AAYPL\'s mission.' },
      { clause: '10.4', text: 'The specific composition, tenure, election/appointment process, and powers of the Board of Trustees shall be as set out in Schedule One of this Constitution.' },
      { clause: '10.5', text: 'The Board of Trustees shall meet at least twice per year and at such other times as may be necessary.' },
    ],
  },
  {
    number: 11,
    title: 'Continental Executive Council',
    sections: [
      { clause: '11.1', text: 'The Continental Executive Council (CEC) shall be the executive organ of AAYPL, responsible for the management, coordination, and programme delivery of the organization.' },
      { clause: '11.2', text: 'The CEC shall be led by the President of AAYPL.' },
      { clause: '11.3', text: 'The Continental Executive Council shall comprise: President, Deputy President, Secretary-General, Deputy Secretary-General, Vice Presidents/Regional Coordinators (one per region), Director-General, Treasurer, Financial Secretary, Publicity and Communications Secretary, Organizing Secretary, Legal Adviser, Youth Development Director, Women and Inclusion Director, and International/Inter-African Relations Director.' },
      { clause: '11.4', text: 'Members of the Continental Executive Council shall be elected or appointed in accordance with this Constitution and the Electoral Regulations of AAYPL.' },
      { clause: '11.5', text: 'The term of office of elected members of the Continental Executive Council shall be as set out in this Constitution and the Electoral Regulations.' },
    ],
  },
  {
    number: 12,
    title: 'General Assembly',
    sections: [
      { clause: '12.1', text: 'The General Assembly is the supreme organ of AAYPL and shall be composed of all members of AAYPL in good standing.' },
      { clause: '12.2', text: 'The General Assembly shall meet at least once every two years in an Ordinary Session.' },
      { clause: '12.3', text: 'An Extraordinary Session of the General Assembly may be convened by the Board of Trustees or upon a written request by not less than one-third of the membership in good standing.' },
      { clause: '12.4', text: 'The General Assembly shall have the power to: review and approve constitutional amendments; elect or confirm leadership as applicable; adopt policies and resolutions; and discharge such other functions as are vested in it by this Constitution.' },
      { clause: '12.5', text: 'Quorum, voting, and procedure at the General Assembly shall be as set out in this Constitution and the Standing Orders of AAYPL.' },
    ],
  },
  {
    number: 13,
    title: 'Committees',
    sections: [
      { clause: '13.1', text: 'AAYPL may establish standing committees and ad hoc committees to support its work as determined by the Board of Trustees or Continental Executive Council.' },
      { clause: '13.2', text: 'Committees may include, but are not limited to: Finance and Audit Committee; Membership and Elections Committee; Programmes and Events Committee; Discipline and Ethics Committee; Media and Communications Committee; and Partnership and International Relations Committee.' },
      { clause: '13.3', text: 'The composition, mandate, and reporting obligations of each committee shall be established by the organ that constitutes it.' },
    ],
  },
  {
    number: 14,
    title: 'Elections',
    sections: [
      { clause: '14.1', text: 'AAYPL shall conduct free, fair, transparent, and credible elections for all elective positions in accordance with this Constitution and the AAYPL Electoral Regulations.' },
      { clause: '14.2', text: 'All members in good standing shall be eligible to vote in AAYPL elections, subject to the specific electoral regulations applicable to each election.' },
      { clause: '14.3', text: 'Eligibility to stand for election shall be governed by this Constitution, the Electoral Regulations, and any applicable criteria established by the Board of Trustees.' },
      { clause: '14.4', text: 'Elections shall be overseen by an Electoral Committee constituted for that purpose, which shall be independent in the conduct of its duties.' },
      { clause: '14.5', text: 'Results of AAYPL elections shall be final subject only to an electoral dispute resolution process as may be established under the Electoral Regulations.' },
    ],
  },
  {
    number: 15,
    title: 'Finance and Accounts',
    sections: [
      { clause: '15.1', text: 'AAYPL shall maintain proper accounts and financial records in accordance with applicable accounting standards and best practices.' },
      { clause: '15.2', text: 'AAYPL\'s funds shall be derived from membership fees, donations, grants, programme revenues, partnership contributions, and such other lawful sources as may be determined by the Board of Trustees.' },
      { clause: '15.3', text: 'The funds of AAYPL shall be used solely for the purpose of advancing the objectives of the organization.' },
      { clause: '15.4', text: 'AAYPL\'s accounts shall be audited annually by an independent auditor appointed by the Board of Trustees.' },
      { clause: '15.5', text: 'The annual financial statements and audit report shall be presented to and adopted by the General Assembly.' },
      { clause: '15.6', text: 'No member of the Continental Executive Council or Board of Trustees shall personally benefit from AAYPL\'s funds beyond legitimate allowances approved by the Board of Trustees.' },
    ],
  },
  {
    number: 16,
    title: 'Code of Conduct',
    sections: [
      { clause: '16.1', text: 'All members of AAYPL are required to conduct themselves in accordance with the highest standards of integrity, professionalism, and respect for others.' },
      { clause: '16.2', text: 'Members shall not engage in conduct that is unlawful, dishonest, discriminatory, violent, or otherwise inconsistent with the principles and objectives of AAYPL.' },
      { clause: '16.3', text: 'AAYPL shall adopt a Code of Conduct setting out detailed standards of expected behavior, which shall be binding on all members.' },
      { clause: '16.4', text: 'Breach of the Code of Conduct may result in disciplinary action as set out in this Constitution.' },
    ],
  },
  {
    number: 17,
    title: 'Discipline',
    sections: [
      { clause: '17.1', text: 'Any member who is alleged to have breached the AAYPL Constitution, Code of Conduct, or applicable regulations shall be subject to the disciplinary process set out in this Article.' },
      { clause: '17.2', text: 'Disciplinary proceedings shall be conducted by the Discipline and Ethics Committee, which shall be constituted to operate independently and impartially.' },
      { clause: '17.3', text: 'Every member subject to disciplinary proceedings shall be entitled to notice, a fair hearing, and the right to respond to allegations before a decision is made.' },
      { clause: '17.4', text: 'Sanctions available in disciplinary proceedings include: written warning; suspension; removal from office; and termination of membership.' },
      { clause: '17.5', text: 'Any member aggrieved by a disciplinary decision may appeal to the Board of Trustees within the time and manner set out in the Disciplinary Regulations.' },
    ],
  },
  {
    number: 18,
    title: 'Conflict of Interest',
    sections: [
      { clause: '18.1', text: 'Every officer and member of AAYPL in a position of responsibility shall avoid situations in which personal interests conflict or appear to conflict with the interests of AAYPL.' },
      { clause: '18.2', text: 'Any officer who has or may have a conflict of interest in any matter before AAYPL shall declare such conflict promptly and shall absent themselves from any discussion or decision on that matter.' },
      { clause: '18.3', text: 'AAYPL shall maintain a Conflict of Interest Register to be updated by all relevant officers.' },
    ],
  },
  {
    number: 19,
    title: 'Political Independence',
    sections: [
      { clause: '19.1', text: 'AAYPL is a non-partisan organization and shall maintain its independence from all political parties, governments, and partisan interests.' },
      { clause: '19.2', text: 'AAYPL shall not endorse, support, or oppose any political party or candidate in any election.' },
      { clause: '19.3', text: 'Individual members of AAYPL retain the right to their personal political opinions and affiliations, but shall not represent such opinions or affiliations as being those of AAYPL.' },
      { clause: '19.4', text: 'AAYPL shall engage with persons from all political persuasions in a balanced, fair, and non-partisan manner in pursuit of its objectives.' },
    ],
  },
  {
    number: 20,
    title: 'Partnerships and Cooperation',
    sections: [
      { clause: '20.1', text: 'AAYPL may enter into partnerships, memoranda of understanding, and cooperative arrangements with: governments and public institutions; civil society organizations; youth organizations; universities and research institutions; international and regional organizations; private sector organizations; development partners; and other lawful organizations.' },
      { clause: '20.2', text: 'All partnerships and cooperative arrangements shall be consistent with AAYPL\'s non-partisan character and shall not compromise the independence or integrity of the organization.' },
      { clause: '20.3', text: 'Partnerships shall be approved by the Board of Trustees or such delegated authority as the Board of Trustees may designate.' },
    ],
  },
  {
    number: 21,
    title: 'Meetings and Quorum',
    sections: [
      { clause: '21.1', text: 'The General Assembly shall meet in ordinary session at least once every two years.' },
      { clause: '21.2', text: 'The Board of Trustees shall meet at least twice per year.' },
      { clause: '21.3', text: 'The Continental Executive Council shall meet as frequently as its work requires, but not less than four times per year.' },
      { clause: '21.4', text: 'Quorum for the General Assembly shall be a simple majority of members in good standing, provided that for constitutional amendments, quorum and voting requirements shall be as set out in Article 24.' },
      { clause: '21.5', text: 'Quorum for the Board of Trustees shall be a simple majority of its members.' },
      { clause: '21.6', text: 'Meetings may be held in person, virtually, or in a combination of both as appropriate.' },
    ],
  },
  {
    number: 22,
    title: 'Regional and National Chapters',
    sections: [
      { clause: '22.1', text: 'Regional Councils shall be established for each of the five African regions: North Africa, West Africa, East Africa, Central Africa, and Southern Africa.' },
      { clause: '22.2', text: 'National Chapters may be established in each country where AAYPL has members, subject to the constitutional procedures and applicable local law.' },
      { clause: '22.3', text: 'State/Provincial and Local/Community Chapters may be established at subnational levels in accordance with procedures established under this Constitution.' },
      { clause: '22.4', text: 'No chapter shall purport to represent AAYPL unless it has been formally constituted in accordance with this Constitution.' },
      { clause: '22.5', text: 'The establishment, governance, and reporting obligations of chapters shall be governed by Chapter Guidelines adopted by the Board of Trustees.' },
    ],
  },
  {
    number: 23,
    title: 'Dissolution',
    sections: [
      { clause: '23.1', text: 'AAYPL may only be dissolved by a resolution passed by not less than three-quarters of all members of AAYPL in good standing at an Extraordinary Session of the General Assembly convened for that purpose.' },
      { clause: '23.2', text: 'In the event of dissolution, the assets of AAYPL remaining after the satisfaction of all debts and liabilities shall be transferred to one or more organizations with similar objectives as determined by the General Assembly at the time of dissolution.' },
      { clause: '23.3', text: 'No portion of AAYPL\'s assets shall be distributed to any member, officer, or trustee of the organization upon dissolution.' },
    ],
  },
  {
    number: 24,
    title: 'Amendments to the Constitution',
    sections: [
      { clause: '24.1', text: 'This Constitution may be amended by a resolution passed by not less than two-thirds of members present and voting at a General Assembly, provided that notice of the proposed amendment has been given to all members at least thirty days before the meeting.' },
      { clause: '24.2', text: 'Proposed amendments may be initiated by the Board of Trustees, the Continental Executive Council, or by a petition signed by not less than one-fifth of the members in good standing.' },
      { clause: '24.3', text: 'No amendment shall be made to this Constitution that would alter the non-partisan character of AAYPL or that would permit the assets of AAYPL to be used for the personal benefit of any member or officer.' },
    ],
  },
  {
    number: 25,
    title: 'Interpretation and Disputes',
    sections: [
      { clause: '25.1', text: 'The Board of Trustees shall have the final authority to interpret this Constitution in cases of dispute or ambiguity.' },
      { clause: '25.2', text: 'Any member or organ of AAYPL may refer a question of constitutional interpretation to the Board of Trustees.' },
      { clause: '25.3', text: 'Disputes among members or between members and organs of AAYPL shall first be subject to internal resolution mechanisms as established under the Disciplinary Regulations before recourse to any external forum.' },
    ],
  },
  {
    number: 26,
    title: 'Supremacy, Transitional Provisions, and Adoption',
    sections: [
      { clause: '26.1', text: 'This Constitution is the supreme governing document of AAYPL. All other regulations, policies, and decisions of AAYPL shall be subordinate to and consistent with this Constitution.' },
      { clause: '26.2', text: 'Any regulation, policy, decision, or action that is inconsistent with this Constitution shall, to the extent of the inconsistency, be void.' },
      { clause: '26.3', text: 'The transitional provisions governing the initial establishment of AAYPL, including the appointment of founding officers and the inaugural elections, shall be as determined by the founding members and the initial Board of Trustees.' },
      { clause: '26.4', text: 'This Constitution was adopted by the founding members of AAYPL as the supreme governing document of the organization.' },
      { clause: '26.5', text: 'This Constitution shall come into effect from the date of its adoption and shall govern the organization and all its members from that date.' },
    ],
  },
]
