import { useEffect, useReducer, useRef } from 'react';

interface TimerProps {
    state: {
        totalSeconds: number;
    },
    countdownParams: { initTotalSeconds: number, timerInterval: number },
    countdownReturns: [{ days: number, hours: number, minutes: number, seconds: number }, (ti: number) => void]
}

function useCountDownTimer({ initTotalSeconds, timerInterval }: TimerProps["countdownParams"]): TimerProps["countdownReturns"] {
    function reducer(state: TimerProps["state"], action: { type: string }): TimerProps["state"] {
        const { totalSeconds } = state;
        if ( action.type == 'tick' ) {
            if ( totalSeconds >= 0 ) {
                return { totalSeconds: totalSeconds - 1 };
            }
            return { totalSeconds: 0 };
        } else {
            throw new Error();
        }
    }

    const [{ totalSeconds }, dispatch] = useReducer(reducer, {
        totalSeconds: initTotalSeconds
    });

    useInterval(() => {
        dispatch({ type: 'tick' });
    }, timerInterval);
    
    function disembleCountdown(totalSeconds: number) {
        const days = Math.floor(totalSeconds / (60 * 60 * 24));
        const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
        const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
        const seconds = totalSeconds % 60;
        return { days, hours, minutes, seconds };
    }

    return [disembleCountdown(totalSeconds), (ti: number): void => { timerInterval = ti }];
}

// https://overreacted.io/making-setinterval-declarative-with-react-hooks/
function useInterval(callback: () => void, delay: number) {
    let callbackRef: React.MutableRefObject<() => void> = useRef(callback);

    // always update callbackRef to the latest callbacks
    useEffect(() => {
        callbackRef.current = callback;
    })

    useEffect(() => {
        function tick() {
            callbackRef.current()
        }

        if (delay !== null) {
            let id = setInterval(() => tick(), delay);
            return () => clearInterval(id);
        }
    }, [delay])
}

function randomWithRange(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function CountdownTimer() {
    const initTotalSeconds = randomWithRange(1, 8639999);

    const [state, _setTimerInterval]: TimerProps["countdownReturns"] = useCountDownTimer({ initTotalSeconds, timerInterval: 1000 });

    let { days, hours, minutes, seconds } = state;

    return (
        <div className="text-center">
            <div className="mb-16">WE'RE LAUNCHING SOON</div>
            <div className="flex justify-center gap-4">
                <div className="flex flex-col">
                    <span className="text-xs">{days}</span>
                    <div className="font-bold">Days</div>
                </div>
                <div className="flex flex-col">
                    <span className="text-xs">{hours}</span>
                    <div className="font-bold">Hours</div>
                </div>
                <div className="flex flex-col">
                    <span className="text-xs">{minutes}</span>
                    <div className="font-bold">Minutes</div>
                </div>
                <div className="flex flex-col">
                    <span className="text-xs">{seconds}</span>
                    <div className="font-bold">Seconds</div>
                </div>
            </div>
            <div>social icons</div>
        </div>
    )
}
