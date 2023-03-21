import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";
import { useEffect } from "react";
import LoadingIcon from "./loadingicon";
import prefix from 'react-prefixer';



export default function Home() {
  const [questionInput, setQuestionInput] = useState("");
  const [result, setResult] = useState();
  const [loading, setLoading] = useState(false);

  async function onSubmit(event) {
          setLoading(true);
    event.preventDefault();
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ animal: questionInput }),
    });
    const data = await response.json();
    setResult(data.result);
    setQuestionInput("");
    setLoading(false);

  }
  function onKeyDown(event) {
    if (event.key === "Enter") {
      onSubmit(event);
    }
  }

  return (
    <div>
      <Head>
        <title>ImamAI</title>
        <link rel="icon" href="/imamfav.png" />
      </Head>

      <main className={styles.main}>
        <img src="/imam.png" className={styles.icon} />
        <h3>Ask ImamAI</h3>
        <p style = {{
          fontSize : "11px",
          paddingBottom: "40px",
        }}>Created by Usama</p>
        {/* <p style={{
            paddingBottom: "30px",
            fontSize : "12px",
          }
            }>&lt;this was made in just few hours, so its not perfect&gt;</p> */}


        <form onSubmit={onSubmit}>
          <input 
          
            // make the form input a rounded rectangle
            style = {{
              // add the webkit appearance to none and make it !important to override the default styling
              WebkitAppearance: 'none',
              border: "1px solid transparent",
              //set the borderColor to a gradient
              boxShadow:" 20px 4px 40px #F45DF9AC, 0px 4px 40px #0099FFA3, -20px 4px 40px #2ACFDBA5",
              borderRadius: "500px",
              marginTop : "1px",
              // WebkitBoxShadow: "20px 5px 40px #CF77F3, 0px 5px 40px #009BFF, -20px 5px 40px #2AC9DB !important",
            }}
            type="text"
            name="animal"
            placeholder="   Ask then press enter "
            value={questionInput}
                    onChange={(e) => setQuestionInput(e.target.value)}
            onKeyDown={onKeyDown}
          />
        </form>
        <div className={styles.result}>{loading ? <LoadingIcon /> : result}</div>
      </main>
    </div>
  );
}
