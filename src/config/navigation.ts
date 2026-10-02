export interface NavigationItem {
    label: string;
    path: string;
    category: string;
}

export const navigationItems: NavigationItem[] = [    
    { label: "SALVADOR", path: "/salvador", category: "Salvador" },
    { label: "POLÍTICA", path: "/politica", category: "Política" },
    { label: "MUNICÍPIOS", path: "/municipios", category: "Municípios" },
    { label: "BASTIDORES", path: "/bastidores", category: "Bastidores" },
    { label: "ENTRETENIMENTO", path: "/entretenimento", category: "Entretenimento" },
    { label: "SERVIÇOS", path: "/servicos", category: "Serviços" },
    { label: "ESPORTE", path: "/esporte", category: "Esporte" },
];
