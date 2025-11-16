import { useState, useEffect } from "react";

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
        college: "Delhi Technological University ",
        img: "/dv_2ndRunnerUp.JPG",
    },
];
export default function WinnerPopup() {
    const [show, setShow] = useState(false);
    const [index, setIndex] = useState(0);
    const [slide, setSlide] = useState(false);

    useEffect(() => {
        if (window.location.pathname === "/") {
            setShow(true);
        }
    }, []);

    // 5 sec slide animation
    useEffect(() => {
        if (!show) return;

        const interval = setInterval(() => {
            setSlide(true); // start slide-out

            setTimeout(() => {
                const nextIndex = (index + 1) % winners.length;

                // preload next image
                const img = new Image();
                img.src = winners[nextIndex].img;

                img.onload = () => {
                    setIndex(nextIndex);
                    setSlide(false); // slide-in
                };
            }, 100); // slide-out duration

        }, 5000);

        return () => clearInterval(interval);
    }, [index, show]);

    if (!show) return null;

    return (
        <div style={styles.overlay}>
            <div style={styles.popup}>

                <button onClick={() => setShow(false)} style={styles.closeBtn}>
                    ✖
                </button>

                <h2 style={styles.heading}>🏆 DataVerse 2025 Winners</h2>
                <p style={styles.congrats}>🎉 Congratulations to all the teams!</p>

                <div
                    style={{
                        ...styles.slideBox,
                        transform: slide ? "translateX(-120%)" : "translateX(0)",
                    }}
                >
                    <img src={winners[index].img} style={styles.image} />

                    <h3 style={styles.rank}>{winners[index].title}</h3>
                    <h3 style={styles.team}>{winners[index].name}</h3>
                    <p style={styles.college}>{winners[index].college}</p>
                </div>
            </div>
        </div>
    );
}

const styles = {
    overlay: {
        position: "fixed",
        top: 0,
        left: 0,
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
        maxWidth: "500px",
        padding: "26px",
        borderRadius: "22px",
        background: "rgba(255,255,255,0.18)",
        backdropFilter: "blur(25px)",
        border: "1px solid rgba(255,255,255,0.25)",
        textAlign: "center",
        color: "#fff",
        position: "relative",
        overflow: "hidden",
    },
    closeBtn: {
        position: "absolute",
        top: "10px",
        right: "16px",
        background: "transparent",
        color: "#fff",
        border: "none",
        fontSize: "22px",
        cursor: "pointer",
    },
    heading: {
        fontSize: "26px",
        fontWeight: "700",
        marginBottom: "6px",
    },
    congrats: {
        fontSize: "16px",
        fontStyle: "italic",
        opacity: 0.95,
        marginBottom: "15px",
    },
    slideBox: {
        transition: "transform 0.35s ease-in-out",
    },
    image: {
        width: "100%",
        borderRadius: "14px",
        marginBottom: "12px",
        boxShadow: "0 5px 18px rgba(0,0,0,0.4)",
    },
    rank: {
        fontSize: "18px",
        textTransform: "uppercase",
        letterSpacing: "0.6px",
        color: "#ffdf70",
        fontWeight: "600",
    },
    team: {
        fontSize: "22px",
        margin: "4px 0",
        fontWeight: "700",
    },
    college: {
        fontSize: "16px",
        opacity: 0.85,
        marginBottom: "10px",
        fontStyle: "italic",
    },
};