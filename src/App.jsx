import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import bgImage from "./assets/images/image.jpg";
import "./App.css";

const PRINT_DURATION = 3.2;
const HOLD_DURATION = 0.7;
const BURST_DURATION = 1.1;
const RETURN_DURATION = 2.0;

const TOTAL_CYCLE =
  PRINT_DURATION +
  HOLD_DURATION +
  BURST_DURATION +
  RETURN_DURATION;

const BURST_START = PRINT_DURATION + HOLD_DURATION;

const paperColors = [
  "#ff4d6d",
  "#ffd166",
  "#06d6a0",
  "#118ab2",
  "#8338ec",
  "#ff9f1c",
  "#ef476f",
  "#00b4d8",
  "#8ac926",
  "#ff595e",
  "#6a4c93",
  "#1982c4",
  "#f72585",
  "#4cc9f0",
  "#ffca3a",
  "#2ec4b6",
];

// =====================================
// 3 DIFFERENT TICKETS
// =====================================

const tickets = [
  {
    movie: "PREMIUM CINEMA",
    subtitle: "Cinema Experience",
    date: "03 OCT 2026",
    time: "07:30 PM",
    seat: "G-12",
    screen: "04",
    bookingId: "BK82941",
    ticket: "01",
    ticketPrice: "₹199",
    convenienceFee: "₹20",
    total: "₹219",
  },

  {
    movie: "MOVIE NIGHT",
    subtitle: "The Ultimate Movie Experience",
    date: "10 OCT 2026",
    time: "08:00 PM",
    seat: "H-08",
    screen: "05",
    bookingId: "BK73652",
    ticket: "02",
    ticketPrice: "₹249",
    convenienceFee: "₹25",
    total: "₹274",
  },

  {
    movie: "VIP PREMIERE",
    subtitle: "Exclusive Premiere Show",
    date: "18 OCT 2026",
    time: "09:15 PM",
    seat: "VIP-03",
    screen: "01",
    bookingId: "BK95173",
    ticket: "03",
    ticketPrice: "₹399",
    convenienceFee: "₹30",
    total: "₹429",
  },
];

// =====================================
// CONFETTI DIRECTIONS
// =====================================

const papers = [
  { x: -210, y: -145, rotate: -55 },
  { x: -175, y: -210, rotate: 35 },
  { x: -125, y: -250, rotate: -25 },
  { x: -65, y: -220, rotate: 70 },
  { x: -20, y: -275, rotate: -60 },
  { x: 45, y: -235, rotate: 45 },
  { x: 105, y: -260, rotate: -40 },
  { x: 165, y: -210, rotate: 65 },
  { x: 215, y: -145, rotate: -30 },

  { x: -250, y: -55, rotate: 50 },
  { x: 250, y: -60, rotate: -65 },

  { x: -235, y: 55, rotate: -45 },
  { x: 235, y: 60, rotate: 55 },

  { x: -200, y: 145, rotate: 70 },
  { x: -125, y: 190, rotate: -35 },
  { x: -45, y: 220, rotate: 55 },
  { x: 40, y: 215, rotate: -60 },
  { x: 120, y: 185, rotate: 35 },
  { x: 200, y: 140, rotate: -50 },

  { x: -280, y: -180, rotate: 45 },
  { x: 280, y: -180, rotate: -45 },
  { x: -300, y: 100, rotate: 70 },
  { x: 300, y: 100, rotate: -70 },

  { x: -90, y: -310, rotate: 35 },
  { x: 90, y: -310, rotate: -35 },
  { x: -160, y: 250, rotate: 60 },
  { x: 160, y: 250, rotate: -60 },

  { x: 0, y: -340, rotate: 80 },
  { x: -320, y: -30, rotate: 50 },
  { x: 320, y: -30, rotate: -50 },

  { x: -350, y: -220, rotate: 90 },
  { x: 350, y: -220, rotate: -90 },
  { x: -380, y: 180, rotate: 120 },
  { x: 380, y: 180, rotate: -120 },

  { x: -260, y: 280, rotate: 45 },
  { x: 260, y: 280, rotate: -45 },

  { x: -100, y: 330, rotate: 70 },
  { x: 100, y: 330, rotate: -70 },
];

function App() {
  // =====================================
  // CHANGE TICKET AFTER EVERY FULL CYCLE
  // =====================================

  const [ticketIndex, setTicketIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTicketIndex((prev) => (prev + 1) % tickets.length);
    }, TOTAL_CYCLE * 1000);

    return () => clearInterval(timer);
  }, []);

  const ticket = tickets[ticketIndex];

  return (
    <main className="cinema-page">

      {/* BACKGROUND */}
      <div
        className="cinema-background"
        style={{ backgroundImage: `url(${bgImage})` }}
      />

      <div className="background-overlay" />

      {/* MAIN ANIMATION AREA */}
      <div className="ticket-stage">

        {/* GOLD PIPE */}
        <div className="gold-pipe">

          <div className="pipe-body">

            <div className="pipe-highlight" />

            <div className="pipe-opening">

              <div className="opening-dark" />

              {/* CONFETTI EXPLOSION */}
              <div className="paper-burst">

                {papers.map((paper, index) => (
                  <motion.span
                    key={index}
                    className={`burst-paper paper-${index % 5}`}
                    style={{
                      backgroundColor:
                        paperColors[index % paperColors.length],
                    }}
                    initial={{
                      x: 0,
                      y: 0,
                      rotate: 0,
                      scale: 0,
                      opacity: 0,
                    }}
                    animate={{
                      x: [
                        0,
                        paper.x * 0.4,
                        paper.x * 1.05,
                        paper.x * 1.3,
                      ],

                      y: [
                        0,
                        paper.y * 0.4,
                        paper.y - 40,
                        paper.y + 150,
                      ],

                      rotate: [
                        0,
                        paper.rotate,
                        paper.rotate * 3,
                        paper.rotate * 5,
                      ],

                      scale: [0, 1.5, 1.1, 0.7],

                      opacity: [0, 1, 1, 0],
                    }}
                    transition={{
                      duration: TOTAL_CYCLE,

                      times: [
                        0,
                        BURST_START / TOTAL_CYCLE,
                        (BURST_START + BURST_DURATION * 0.6) /
                          TOTAL_CYCLE,
                        (BURST_START + BURST_DURATION) /
                          TOTAL_CYCLE,
                      ],

                      ease: "easeOut",
                      repeat: Infinity,
                      repeatDelay: 0,
                    }}
                  />
                ))}

              </div>
            </div>
          </div>
        </div>

        {/* RECEIPT PRINT AREA */}
        <div className="receipt-slot">

          <motion.div
            className="receipt-animation"
            initial={{
              clipPath: "inset(0 0 100% 0)",
            }}
            animate={{
              clipPath: [
                "inset(0 0 100% 0)",
                "inset(0 0 0% 0)",
                "inset(0 0 0% 0)",
                "inset(100% 0 0% 0)",
              ],
            }}
            transition={{
              duration: TOTAL_CYCLE,

              times: [
                0,
                PRINT_DURATION / TOTAL_CYCLE,
                (PRINT_DURATION + HOLD_DURATION) /
                  TOTAL_CYCLE,
                1,
              ],

              ease: "linear",
              repeat: Infinity,
              repeatDelay: 0,
            }}
          >

            {/* =====================================
                RECEIPT
            ===================================== */}

            <div className="movie-receipt">

              {/* TOP */}
              <div className="receipt-top">
                <span>MOVIE TICKET</span>
                <small>ONLINE BOOKING</small>
              </div>

              <div className="receipt-divider" />

              {/* MOVIE INFO */}
              <div className="movie-info">

                <small>NOW SHOWING</small>

                <h1>{ticket.movie}</h1>

                <p>{ticket.subtitle}</p>

              </div>

              <div className="receipt-divider dotted" />

              {/* DETAILS */}
              <div className="ticket-details">

                <div>
                  <span>DATE</span>
                  <strong>{ticket.date}</strong>
                </div>

                <div>
                  <span>TIME</span>
                  <strong>{ticket.time}</strong>
                </div>

                <div>
                  <span>SEAT</span>
                  <strong>{ticket.seat}</strong>
                </div>

                <div>
                  <span>SCREEN</span>
                  <strong>{ticket.screen}</strong>
                </div>

              </div>

              <div className="receipt-divider dotted" />

              {/* BOOKING */}
              <div className="booking-info">

                <div>
                  <span>BOOKING ID</span>
                  <strong>{ticket.bookingId}</strong>
                </div>

                <div>
                  <span>TICKET</span>
                  <strong>{ticket.ticket}</strong>
                </div>

              </div>

              {/* PRICE */}
              <div className="price-section">

                <div className="price-row">
                  <span>Ticket</span>
                  <span>{ticket.ticketPrice}</span>
                </div>

                <div className="price-row">
                  <span>Convenience Fee</span>
                  <span>{ticket.convenienceFee}</span>
                </div>

                <div className="price-row total">
                  <span>TOTAL</span>
                  <strong>{ticket.total}</strong>
                </div>

              </div>

              {/* PAYMENT */}
              <div className="payment-status">
                <span>●</span>
                PAYMENT SUCCESSFUL
              </div>

              {/* BARCODE */}
              <div className="barcode-section">

                <div className="barcode">
                  {Array.from({ length: 22 }).map((_, i) => (
                    <i key={i} />
                  ))}
                </div>

                <small>
                  {ticket.bookingId} • {ticket.date}
                </small>

              </div>

              {/* FOOTER */}
              <div className="receipt-footer">
                <strong>THANK YOU</strong>
                <span>ENJOY THE MOVIE</span>
              </div>

              {/* TORN EDGE */}
              <div className="receipt-tear" />

            </div>
          </motion.div>
        </div>

      </div>
    </main>
  );
}

export default App;
