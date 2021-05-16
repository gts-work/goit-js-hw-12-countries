import "./styles.css";
import { CountdownTimer } from "./js/plugin-timer";

new CountdownTimer({
    selector: "#timer-1",
    targetDate: new Date("Jun 29, 2021"),
});
