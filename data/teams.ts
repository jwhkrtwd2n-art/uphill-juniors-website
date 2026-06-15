type Sponsor = {
  name: string;
  logo: string;
  href: string;
};

type SponsorOpportunity = {
  label: string;
  package: "main" | "back" | "training";
  sponsor?: Sponsor;
};

type Team = {
  name: string;
  schoolYear: string;
  birthRange: string;
  format: string;
  status: string;
  description: string;
  sponsorOpportunities: SponsorOpportunity[];
};

export const teams: Team[] = [
  {
    name: "U16s",
    schoolYear: "Year 11",
    birthRange: "01/09/2010 - 31/08/2011",
    format: "11-a-side",
    status: "Currently Full",
    description:
      "Competitive grassroots football focused on teamwork, development and preparing players for adult football.",
    sponsorOpportunities: [
      { label: "Front of shirt sponsor", package: "main" },
      { label: "Back of shirt sponsor", package: "back" },
      { label: "Training shirt sponsor", package: "training" },
    ],
  },
  {
    name: "U15s",
    schoolYear: "Years 9 & 10",
    birthRange: "01/09/2011 - 31/08/2012",
    format: "11-a-side",
    status: "Currently Full",
    description:
      "A challenging and supportive environment where players continue to develop technical ability and game understanding.",
    sponsorOpportunities: [
      { label: "Front of shirt sponsor", package: "main" },
      { label: "Back of shirt sponsor", package: "back" },
      { label: "Training shirt sponsor", package: "training" },
    ],
  },
  {
    name: "U13s",
    schoolYear: "Years 7 & 8",
    birthRange: "01/09/2013 - 31/08/2015",
    format: "9-a-side",
    status: "Currently Full",
    description:
      "Youth football focused on confidence, teamwork, development and enjoyment.",
    sponsorOpportunities: [
      { label: "Front of shirt sponsor", package: "main" },
      { label: "Back of shirt sponsor", package: "back" },
      { label: "Training shirt sponsor", package: "training" },
    ],
  },
  {
    name: "U11s",
    schoolYear: "Years 5 & 6",
    birthRange: "01/09/2015 - 31/08/2017",
    format: "7-a-side",
    status: "Currently Full",
    description:
      "An important development stage where players build technical skills and match awareness.",
    sponsorOpportunities: [
      { label: "Front of shirt sponsor", package: "main" },
      { label: "Back of shirt sponsor", package: "back" },
      { label: "Training shirt sponsor", package: "training" },
    ],
  },
  {
    name: "U09s",
    schoolYear: "Year 4",
    birthRange: "01/09/2017 - 31/08/2018",
    format: "5-a-side",
    status: "Currently Full",
    description:
      "Small-sided football designed to maximise touches, learning and enjoyment.",
    sponsorOpportunities: [
      { label: "Front of shirt sponsor", package: "main" },
      { label: "Back of shirt sponsor", package: "back" },
      { label: "Training shirt sponsor", package: "training" },
    ],
  },
  {
    name: "U08s",
    schoolYear: "Year 3",
    birthRange: "01/09/2018 - 31/08/2019",
    format: "5-a-side",
    status: "Currently Full",
    description:
      "Fun and supportive football helping young players build confidence and friendships.",
    sponsorOpportunities: [
      { label: "Front of shirt sponsor", package: "main" },
      { label: "Back of shirt sponsor", package: "back" },
      { label: "Training shirt sponsor", package: "training" },
    ],
  },
  {
    name: "U07s",
    schoolYear: "Year 2",
    birthRange: "01/09/2019 - 31/08/2020",
    format: "3-a-side",
    status: "Limited Spaces",
    description:
      "A welcoming introduction to organised football and matchday experiences.",
    sponsorOpportunities: [
      { label: "Front of shirt sponsor", package: "main" },
      { label: "Back of shirt sponsor", package: "back" },
      { label: "Training shirt sponsor", package: "training" },
    ],
  },
  {
    name: "U06s",
    schoolYear: "Reception & Year 1",
    birthRange: "01/09/2020 - 02/11/2022",
    format: "Non-competitive",
    status: "Recruiting",
    description:
      "First steps into football through games, movement, fun and fundamental skills.",
    sponsorOpportunities: [
      { label: "Training shirt sponsor", package: "training" },
    ],
  },
];
