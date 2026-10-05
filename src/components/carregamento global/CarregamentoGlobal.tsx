import Footer from "../footer/Footer";
import Header from "../header/Header";


export default function CarregamentoGlobal() {
    return (
        <>
            <Header />
            
            <main style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '65vh',
                width: '100%',
                padding: '2rem'
            }}>
                <style>
                    {`
                        @keyframes girarApp { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
                        .spinner-interno { 
                            width: 55px; 
                            height: 55px; 
                            border: 6px solid rgba(8, 59, 92, 0.1); 
                            border-top-color: #083b5c; 
                            border-radius: 50%; 
                            animation: girarApp 1s linear infinite; 
                            margin-bottom: 1.5rem; 
                        }
                    `}
                </style>
                <div className="spinner-interno"></div>
                <p style={{ 
                    fontWeight: 600, 
                    color: "#083b5c", 
                    fontSize: "1.2rem",
                    fontFamily: 'system-ui, sans-serif'
                }}>
                    A apurar as últimas notícias...
                </p>
            </main>

            <Footer />
        </>
    );
}