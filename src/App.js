import React from 'react';
import Layout from "./Components/Layout";
import {ThemeProvider} from "./Contexts/ThemeContext";
import PageContainer from "./Components/PageContainer";
import {AuthProvider} from "./Contexts/AuthContext";

function App() {
    return (
        <ThemeProvider>
            <AuthProvider>
                <PageContainer>
                    <Layout/>
                </PageContainer>
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App;
