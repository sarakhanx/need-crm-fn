
import { useEffect, useState } from 'react';

interface SessionData {
    username: string;
    name: string;
    lastname: string;
    id: number;
    token: string;
}

export function useUserSession() {
    const [userSession, setUserSession] = useState<SessionData | null>(null);


    const setUserSessionData = (sessionData: SessionData) => {
        setUserSession(sessionData);
        
        if (typeof window !== 'undefined') {
            sessionStorage.setItem("session", JSON.stringify(sessionData));
        }
    };
    const getUserSessionData = (): SessionData | null => {
        if (typeof window !== 'undefined') {
            const sessionData = sessionStorage.getItem("session");
            if (sessionData) {
                return JSON.parse(sessionData);
            }
        }
        return null;
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const sessionData = sessionStorage.getItem("session");
            if (sessionData) {
                setUserSession(JSON.parse(sessionData));
            }
        }
    }, []);
    return { userSession, setUserSessionData, getUserSessionData };
}
