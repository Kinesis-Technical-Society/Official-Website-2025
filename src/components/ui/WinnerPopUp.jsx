import { useState, useEffect, useRef } from "react";

const winners = [
    {
        id: 1,
        title: "Winner",
        name: "Team C0mrades",
        college: "KIET Group of Institutions",
        img: "/dv_winner.JPG",
    },
    {
        id: 2,
        title: "1st Runner Up",
        name: "Team Orbyte",
        college: "ABESIT Group of Institutions",
        img: "/dv_1stRunnerUp.JPG",
    },
    {
        id: 3,
        title: "2nd Runner Up",
        name: "Team Hackbros",
        college: "Delhi Technological University",
        img: "/dv_2ndRunnerUp.JPG",
    },
];

export default function WinnerPopup() {
    const [show, setShow] = useState(false);
    const [index, setIndex] = useState(0); // current visible slide index
    const [nextIndex, setNextIndex] = useState(1); // next slide to show
    const [sliding, setSliding] = useState(false); // true while animation runs
    const intervalRef = useRef(null);

    const SLIDE_INTERVAL = 5000; // 5s per slide
    const SLIDE_DURATION = 450; // ms, must match CSS transition

    // show only on home page
    useEffect(() => {
        if (typeof window !== "undefined" && window.location.pathname === "/") {
            setShow(true);
        }
    }, []);

    // keep nextIndex in sync when index changes
    useEffect(() => {
        setNextIndex((index + 1) % winners.length);
    }, [index]);

    // preload helper
    function preloadImage(src) {
        return new Promise((res) => {
            const img = new Image();
            img.src = src;
            if (img.complete) return res();
            img.onload = () => res();
            img.onerror = () => res(); // resolve even on error to avoid lock
        });
    }

    // single slide cycle: preload next -> animate -> switch indices
    async function doSlideOnce() {
        const upcoming = (index + 1) % winners.length;
        await preloadImage(winners[upcoming].img);

        // start sliding: current moves left, next moves to center
        setSliding(true);

        // after animation finishes, switch to next as current
        setTimeout(() => {
            setIndex(upcoming);
            setSliding(false);
            // nextIndex will auto-update via effect
        }, SLIDE_DURATION);
    }

    // set interval to run doSlideOnce every SLIDE_INTERVAL
    useEffect(() => {
        if (!show) return;
        // make sure there is no overlapping interval
        if (intervalRef.current) clearInterval(intervalRef.current);

        // start a timer that triggers the slide cycle
        intervalRef.current = setInterval(() => {
            // call doSlideOnce but ensure it doesn't stack if sliding already
            if (!sliding) doSlideOnce();
        }, SLIDE_INTERVAL);

        // also start the first slide after SLIDE_INTERVAL (so user sees first slide for full time)
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
            intervalRef.current = null;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [show, index, sliding]);

    // If popup not shown or no winners
    if (!show || winners.length === 0) return null;

    // For layout stability set a fixed image height (adjust as needed)
    const IMAGE_HEIGHT = 260; // px - keeps container stable and prevents jumping

    return (
        <div style={styles.overlay}>
            <div style={styles.popup}>
                <button onClick={() => setShow(false)} style={styles.closeBtn}>✖</button>

                <h2 style={styles.heading}>🏆 DataVerse 2025 Winners</h2>
                <p style={styles.congrats}>🎉 Congratulations to all the teams!</p>

                {/* Slider viewport: fixed height so text doesn't jump */}
                <div style={{ ...styles.viewport, height: IMAGE_HEIGHT + 140 }}>
                    {/* Two cards positioned absolutely and moved via transform.
              - current card: when not sliding -> translateX(0). when sliding -> -100%
              - next card: when not sliding -> +100%. when sliding -> 0
              This ensures both move simultaneously and no blank gap appears.
          */}
                    <div
                        key={winners[index].id}
                        style={{
                            ...styles.card,
                            transform: sliding ? "translateX(-100%)" : "translateX(0%)",
                            transition: `transform ${SLIDE_DURATION}ms ease-in-out`,
                        }}
                    >
                        <div style={{ ...styles.imageWrap, height: IMAGE_HEIGHT }}>
                            <img
                                src={winners[index].img}
                                alt={winners[index].name}
                                style={styles.image}
                            />
                        </div>
                        <div style={styles.textWrap}>
                            <div style={styles.rank}>{winners[index].title}</div>
                            <div style={styles.team}>{winners[index].name}</div>
                            <div style={styles.college}>{winners[index].college}</div>
                        </div>
                    </div>

                    <div
                        key={winners[nextIndex].id}
                        style={{
                            ...styles.card,
                            transform: sliding ? "translateX(0%)" : "translateX(100%)",
                            transition: `transform ${SLIDE_DURATION}ms ease-in-out`,
                        }}
                    >
                        <div style={{ ...styles.imageWrap, height: IMAGE_HEIGHT }}>
                            <img
                                src={winners[nextIndex].img}
                                alt={winners[nextIndex].name}
                                style={styles.image}
                            />
                        </div>
                        <div style={styles.textWrap}>
                            <div style={styles.rank}>{winners[nextIndex].title}</div>
                            <div style={styles.team}>{winners[nextIndex].name}</div>
                            <div style={styles.college}>{winners[nextIndex].college}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Inline styles
const styles = {
    overlay: {
        position: "fixed",
        top: 0, left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.55)",
        backdropFilter: "blur(6px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
    },
    popup: {
        width: "92%",
        maxWidth: "560px",
        padding: "22px",
        borderRadius: "18px",
        background: "rgba(255,255,255,0.12)",
        backdropFilter: "blur(18px)",
        border: "1px solid rgba(255,255,255,0.16)",
        textAlign: "center",
        color: "#fff",
        position: "relative",
        overflow: "hidden",
        boxShadow: "0 12px 34px rgba(0,0,0,0.45)",
    },
    closeBtn: {
        position: "absolute",
        top: "10px",
        right: "14px",
        background: "transparent",
        color: "#fff",
        border: "none",
        fontSize: "20px",
        cursor: "pointer",
    },
    heading: {
        fontSize: "24px",
        fontWeight: 700,
        margin: "4px 0 6px",
    },
    congrats: {
        fontSize: "15px",
        margin: "0 0 12px",
        opacity: 0.95,
        fontStyle: "italic",
    },

    // viewport holds two absolute positioned cards that slide
    viewport: {
        position: "relative",
        width: "100%",
        margin: "0 auto",
    },

    // each sliding card
    card: {
        position: "absolute",
        left: 0,
        top: 0,
        width: "100%",
        boxSizing: "border-box",
        padding: "12px 6px 18px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },

    imageWrap: {
        width: "100%",
        overflow: "hidden",
        borderRadius: "12px",
        background: "#111",
    },

    image: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        display: "block",
    },

    textWrap: {
        marginTop: 12,
        width: "100%",
    },

    rank: {
        fontSize: "14px",
        color: "#f6d36b",
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "0.6px",
    },
    team: {
        fontSize: "20px",
        fontWeight: 800,
        marginTop: 6,
    },
    college: {
        fontSize: "14px",
        marginTop: 6,
        fontStyle: "italic",
        opacity: 0.9,
    },
};
