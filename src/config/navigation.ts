export interface NavigationItem {
    label: string;
    path: string;
    category: string;
    showInHeader: boolean;
}

export const navigationItems: NavigationItem[] = [    
    { label: "SALVADOR", path: "/salvador", category: "Salvador", showInHeader: true },
    { label: "POLÍTICA", path: "/politica", category: "Política", showInHeader: true },
    { label: "MUNICÍPIOS", path: "/municipios", category: "Municípios", showInHeader: true },
    { label: "BASTIDORES", path: "/bastidores", category: "Bastidores", showInHeader: true },
    { label: "ENTRETENIMENTO", path: "/entretenimento", category: "Entretenimento", showInHeader: true },
    { label: "SERVIÇOS", path: "/servicos", category: "Serviços", showInHeader: true },
    { label: "ESPORTE", path: "/esporte", category: "Esporte", showInHeader: true },
    { label: "ECONOMIA", path: "/economia", category: "Economia", showInHeader: false }, 
];