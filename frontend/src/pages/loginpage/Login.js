import { auth } from "../../utils/firebaseConfig";
import { RecaptchaVerifier, signInWithPhoneNumber } from "@firebase/auth";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Button, Col, Form, FormGroup, Input, Row, Spinner } from "reactstrap";
import WaveBack from "../../assets/wave-bg.png";
import BannerCycle from "../../assets/banner_cycle.png";
import LOGO from "../../assets/LOGO.svg";
import "./login.scss";
import { authenticateUser } from "./helpers/authCalls";
import { useHistory, useLocation } from "react-router";
import { Link } from "react-router-dom";

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);

  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: response => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          //   onSignInSubmit();
          console.log("CAPTCHA SOLVED");
        },
      },
      auth
    );
  }, []);

  const sendVerificationCode = () => {
    if (phoneNumber.length !== 10) {
      return toast.error("Please enter a valid phone number");
    }
    setLoading(true);
    let phone = "+91" + phoneNumber;
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phone, appVerifier)
      .then(confirmationResult => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        console.log("CODE SENT", confirmationResult);
        toast.success(`OTP Sent`);
        setCodeSent(true);
        // ...
      })
      .catch(error => {
        // Error; SMS not sent
        console.log("ERROR: ", error);
        toast.error(`Something went wrong!`);
        setCodeSent(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const verifyOTP = () => {
    setLoading(true);
    window.confirmationResult
      .confirm(code)
      .then(result => {
        // User signed in successfully.
        const user = result.user;
        console.log("USER: ", user);
        auth.currentUser.getIdToken(true).then(idToken => {
          authenticateUser(idToken)
            .then(res => {
              toast.success(`Login Success`);
              console.log("RES: ", res);
              if (location.state === "cart") {
                return history.push("/cart");
              } else if (location.state === "orders") {
                return history.push("/orders");
              }
              history.push("/");
            })
            .catch(err => {
              console.log("ERR: ", err);
            })
            .catch(err => {
              console.log("ERR: ", err);
            });
        });
      })
      .catch(error => {
        // User couldn't sign in (bad verification code?)
        console.log("ERROR: ", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <div className="loginpage">
        <Row className="loginPageRow">
          <Col md={6} className="hero-section">
            <img className="cycloo-logo" src={LOGO} alt="Cycloo" />
            <p className="page-sub-title">When in doubt, paddle it out!</p>
            <img
              src={BannerCycle}
              alt="banner_cycle"
              className="banner_cycle"
            />
          </Col>
          <Col md={6}>
            <Form className="login-form">
              <h2 className="login-title">
                <span className="text-purple">Easy</span> Login
              </h2>
              <FormGroup>
                <Input
                  value={phoneNumber}
                  onChange={e => setPhoneNumber(e.target.value)}
                  placeholder="Enter Phone Number"
                  className="login-input"
                  disabled={codeSent}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  value={code}
                  disabled={!codeSent}
                  onChange={e => setCode(e.target.value)}
                  placeholder="Enter OTP"
                  className="login-input"
                />
                {!codeSent ? (
                  <Button className="login-btn" onClick={sendVerificationCode}>
                    <span>
                      {loading ? <Spinner color="light" /> : "Sent OTP"}
                    </span>
                  </Button>
                ) : (
                  <Button className="login-btn" onClick={verifyOTP}>
                    <span>
                      {loading ? <Spinner color="light" /> : "Verify"}
                    </span>
                  </Button>
                )}
              </FormGroup>
              <center>
                <div id="recaptcha-container"></div>
              </center>
              <Link
                to="/"
                style={{
                  textDecoration: "none",
                  color: "#224957",
                  fontFamily: "Quicksand",
                }}
              >
                <p style={{ paddingTop: "10px", fontWeight: "600" }}>
                  Continue as Guest
                </p>
              </Link>
            </Form>
          </Col>

          {/* <WaveBG /> */}
        </Row>
        <img src={WaveBack} alt="wave-bg" className="wave-bg" />
      </div>
    </>
  );
};

export default Login;
