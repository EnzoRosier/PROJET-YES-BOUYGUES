import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// Hook: navigates to home ("/") after `timeoutMs` of inactivity
export default function useInactivityTimeout(timeoutMs: number = 5 * 60 * 1000, onTimeout?: () => void) {
  const navigate = useNavigate();
  const timerRef = useRef<number | null>(null);

  const resetTimer = () => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
    }
    timerRef.current = window.setTimeout(() => {
      if (onTimeout) {
        onTimeout();
      } else {
        navigate('/');
      }
    }, timeoutMs);
  };

  useEffect(() => {
    const events = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'click'];
    const handleActivity = () => resetTimer();

    events.forEach((ev) => window.addEventListener(ev, handleActivity));

    // Start the initial timer
    resetTimer();

    return () => {
      events.forEach((ev) => window.removeEventListener(ev, handleActivity));
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [timeoutMs, onTimeout, navigate]);
}
