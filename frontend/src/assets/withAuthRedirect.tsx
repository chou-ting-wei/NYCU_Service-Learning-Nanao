import React, { useEffect, ComponentType } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const withAuthRedirect = <P extends object>(WrappedComponent: ComponentType<P>) => {
    return (props: P) => {
        const [cookies] = useCookies(['user']);
        const navigate = useNavigate();

        useEffect(() => {
            if (!cookies.user) {
                navigate('/home');
            }
        }, [cookies, navigate]);

        return <WrappedComponent {...props} />;
    };
};

export default withAuthRedirect;
