/* ==========================================================================
   ECE TECHNICAL EVENT 2026 — YENEPOYA INSTITUTE OF TECHNOLOGY
   Event Data Store — Yenepoya Institute of Technology & Echolectic
   ========================================================================== */

const EVENT_DATA = {
  eventName: "Yenepoya Institute of Technology",
  eventTagline: "ENVIRONMENT OF INNOVATION",
  association: "Echolectic — INSPIRING INNOVATIONS...",
  eventDate: "2026-10-06T09:00:00",
  rulebookUrl: "https://drive.google.com/file/d/1AYqRNHcqeFgp1cuTXvrE9TlKy9n8v9cG/view?usp=drivesdk",
  venue: "Yenepoya Institute of Technology, Moodbidri",
  institution: "Yenepoya Institute of Technology",
  department: "Department of Electronics & Communication Engineering",
  accreditation: "Recognized by AICTE & Affiliated to VTU Belagavi (Est. 2008)",

  hardwareKit: [
    { id: "comp-arduino", name: "Arduino Uno", qty: "1 Unit", type: "Microcontroller", desc: "ATmega328P based main processing unit for real-time sensor processing and motor actuation." },
    { id: "comp-dht22", name: "DHT22 Sensor", qty: "2 Units", type: "Climatic Sensing", desc: "Digital temperature & humidity sensor with high precision signal calibration." },
    { id: "comp-soil", name: "Soil Moisture", qty: "2 Units", type: "Analog Probe", desc: "Resistive soil moisture sensor for agricultural automation & irrigation logic." },
    { id: "comp-lcd", name: "LCD Display", qty: "1 Unit", type: "User Interface", desc: "16x2 Character LCD with I2C module interface for telemetry output." },
    { id: "comp-buzzer", name: "Buzzer Module", qty: "1 Unit", type: "Acoustic Alert", desc: "Piezoelectric active buzzer for multi-frequency acoustic alarm triggers." },
    { id: "comp-led", name: "Status LEDs", qty: "1 Unit", type: "Visual Signal", desc: "Multi-color diffuse LEDs for binary status indication & debugging." },
    { id: "comp-servo", name: "Servo Motor", qty: "1 Unit", type: "Actuator", desc: "SG90 9g micro servo motor for precise angular position control." },
    { id: "comp-mq135", name: "MQ135 Gas Sensor", qty: "1 Unit", type: "Air Quality", desc: "Hazardous gas & air quality detection sensor for environmental safety monitoring." },
    { id: "comp-relay", name: "Relay Module", qty: "1 Unit", type: "Power Switch", desc: "Single channel 5V optical isolation relay for high voltage load switching." },
    { id: "comp-fan", name: "Small DC Fan", qty: "1 Unit", type: "Thermal Control", desc: "5V brushless cooling fan for forced airflow & thermal dissipation." },
    { id: "comp-breadboard", name: "Breadboard", qty: "1 Unit", type: "Prototyping", desc: "830 tie-point solderless breadboard matrix with power rails." },
    { id: "comp-jumper", name: "Jumper Wires", qty: "Assorted Pack", type: "Interconnect", desc: "Male-to-Male, Male-to-Female, and Female-to-Female flexible jumper wires." }
  ],

  team: {
    faculty: [
      { role: "Chief Convenor", name: "Dr. Abdul Kareem", dept: "Yenepoya Institute of Technology", init: "AK" },
      { role: "Dean Academics", name: "Dr. Melwin D'Souza", dept: "Yenepoya Institute of Technology", init: "MD" },
      { role: "Convenor", name: "Dr. Prasanna Kumar C", dept: "HOD, ECE Dept", init: "PK" },
      { role: "Faculty Coordinator", name: "Dr. Shashank M Gowda", dept: "ECE Department", init: "SG" }
    ],
    students: []
  },

  achievements: [
    { year: "2025", title: "National Embedded Systems Challenge — 1st Place", org: "IEEE Region 10 Innovation Summit", desc: "ECE team developed an autonomous IoT smart grid monitoring system with micro-second fault localization." },
    { year: "2024", title: "Best Student Project Award", org: "Karnataka State Council for Science & Technology (KSCST)", desc: "Recognized for AI-driven edge-computing telemetry for precision agriculture." },
    { year: "2023", title: "RoboPrix All-India Championship Finalist", org: "National Robotics League", desc: "Custom designed high-speed line maze solver robot featuring adaptive PID control." }
  ]
};
