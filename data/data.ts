export const possibleFilters = {
  dvEntwicklung: ["Entwicklung", "Planung", "Bauphase", "Gewährleistung"],
  dvDemo: [
    "Anfrage",
    "Kalkulation",
    "Arbeitsvorbereitung",
    "Rohbau",
    "Ausbau",
    "Fertigstellung",
    "Gewährleistung",
    "Verhandlung",
  ],
  hoelzl: [
    "Abgschlossen",
    "Archiv",
    "Aktuell",
    "Abgerechnet",
    "Nicht Beauftragt",
    "Beauftragt",
  ],
};

export const phaseColors = {
  dvEntwicklung: {
    Entwicklung: "bg-blue-500",
    Planung: "bg-amber-600",
    Bauphase: "bg-red-500",
    Gewährleistung: "bg-green-500",
  },
  dvDemo: {
    Anfrage: "bg-green-500",
    Kalkulation: "bg-green-600",
    Arbeitsvorbereitung: "bg-red-500",
    Rohbau: "bg-green-500",
    Ausbau: "bg-blue-500",
    Fertigstellung: "bg-amber-600",
    Verhandlung: "bg-red-500",
    Gewährleistung: "bg-green-500",
  },
  hoelzl: {
    Abgschlossen: "bg-green-500",
    Archiv: "bg-green-600",
    Aktuell: "bg-red-500",
    Abgerechnet: "bg-green-500",
    "Nicht Beauftragt": "bg-blue-500",
    Beauftragt: "bg-amber-600",
  },
};

export const keys = {
  dvEntwicklung: "xk9zrexbm17q6bfqc",
  dvDemo: "vivh3t4uidqlg69jk",
  hoelzl: "DSKP3zkNBJ",
};

export const dvEntwicklung = {
  filters: ["Entwicklung", "Planung", "Bauphase", "Gewährleistung"],
  colors: {
    Entwicklung: "bg-blue-500",
    Planung: "bg-amber-600",
    Bauphase: "bg-red-500",
    Gewährleistung: "bg-green-500",
  },
  customer_key: "xk9zrexbm17q6bfqc",
  dbLink:
    "https://digital-vereinfacht.ninoxdb.de/v1/teams/xk9zrexbm17q6bfqc/databases/lryyv6de5s5z/tables/L/records/",

  db_key: "40d25de0-19b8-11ef-b4f9-09d220c0ba76",
};

export const dvDemo = {
  filters: [
    "Anfrage",
    "Kalkulation",
    "Arbeitsvorbereitung",
    "Rohbau",
    "Ausbau",
    "Fertigstellung",
    "Gewährleistung",
    "Verhandlung",
  ],
  colors: {
    Anfrage: "bg-green-500",
    Kalkulation: "bg-green-600",
    Arbeitsvorbereitung: "bg-red-500",
    Rohbau: "bg-green-500",
    Ausbau: "bg-blue-500",
    Fertigstellung: "bg-amber-600",
    Verhandlung: "bg-red-500",
    Gewährleistung: "bg-green-500",
  },
  customer_key: "vivh3t4uidqlg69jk",
  dbLink:
    "https://digital-vereinfacht.ninoxdb.de/v1/teams/vivh3t4uidqlg69jk/databases/brfog9v7nl2z/tables/WB/records",

  db_key: "40d25de0-19b8-11ef-b4f9-09d220c0ba76",
};

export const hoelzl = {
  filters: [
    "Abgschlossen",
    "Archiv",
    "Aktuell",
    "Abgerechnet",
    "Nicht Beauftragt",
    "Beauftragt",
  ],
  colors: {
    Abgschlossen: "bg-green-500",
    Archiv: "bg-green-600",
    Aktuell: "bg-red-500",
    Abgerechnet: "bg-green-500",
    "Nicht Beauftragt": "bg-blue-500",
    Beauftragt: "bg-amber-600",
  },
  customer_key: "DSKP3zkNBJ",
  dbLink:
    "https://digital-vereinfacht.ninoxdb.de/v1/teams/vivh3t4uidqlg69jk/databases/brfog9v7nl2z/tables/WB/records",
  db_key: "NTlmODM0ZjgtZTQ4Ny01NjlmLTkxNGUtNDkwZmE1YjVhOGYw",
};
