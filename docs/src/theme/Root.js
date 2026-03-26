import React, {useEffect} from 'react';
import {useLocation, useHistory} from '@docusaurus/router';

const COOKIE_NAME = 'language_preference';
const COOKIE_MAX_AGE = 365 * 24 * 60 * 60;

function getCookie(name) {
  const match = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${name}=`));
  return match ? match.split('=')[1] : null;
}

function setCookie(name, value) {
  document.cookie = `${name}=${value};path=/;max-age=${COOKIE_MAX_AGE};SameSite=Lax`;
}

export default function Root({children}) {
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    const isRuPath = location.pathname.startsWith('/ru/') || location.pathname === '/ru';
    const currentLang = isRuPath ? 'ru' : 'en';
    const preferredLang = getCookie(COOKIE_NAME);

    if (!preferredLang) {
      setCookie(COOKIE_NAME, currentLang);
      return;
    }

    if (preferredLang === currentLang) {
      return;
    }

    if (preferredLang === 'ru' && !isRuPath) {
      history.push(`/ru${location.pathname}`);
    } else if (preferredLang === 'en' && isRuPath) {
      const enPath = location.pathname.replace(/^\/ru\/?/, '/');
      history.push(enPath || '/');
    }
  }, [location.pathname, history]);

  useEffect(() => {
    const isRuPath = location.pathname.startsWith('/ru/') || location.pathname === '/ru';
    setCookie(COOKIE_NAME, isRuPath ? 'ru' : 'en');
  }, [location.pathname]);

  return <>{children}</>;
}
