// ===================================================================================================================================/
/************************************ Compound interest solution******************************************************* */

const container = document.querySelector(".container");
const inputValues = document.querySelectorAll(".inputValues");

// LOGIC

// declaring variables
let amount = 0;
let totalInterest = 0;
let nthRoot = 0;
let r = 0;

let numeratorValue = 0;
let denominatorValue = 0;
let percent = 100;
let principalValue = 1;
let numValue = 1;
let divideNumerator = 0;
let divideDenominator = 0;
let numeratorRootValue = 0;
let denominatorRootValue = 0;

let percentageRate = 0;

inputValues.forEach((input) => {
  input.addEventListener("change", (e) => {
    const value = parseFloat(e.target.value);
    if (input.name === "amount") amount = value;

    if (input.name === "rate") r = value;

    if (input.name === "time") nthRoot = value;

    if (input.name === "interest") totalInterest = value;

    if (!amount && r && nthRoot && totalInterest) {
      const rateValue = (principalValue + r / percent) ** nthRoot;
      amount = parseFloat(totalInterest / rateValue).toFixed(1);
      percentageRate = r;
    }
    if (!totalInterest && amount && r && nthRoot) {
      const rateValue = (principalValue + r / percent) ** nthRoot;
      totalInterest = parseFloat(amount * rateValue).toFixed(1);
      percentageRate = r;
    }
    if (!nthRoot && amount && r && totalInterest) {
      const result = totalInterest / amount;
      const base = principalValue + r / percent;
      nthRoot = Math.log(result) / Math.log(base);
      percentageRate = r;
    }
    if (!r && amount && nthRoot && totalInterest) {
      divideNumerator = totalInterest;
      divideDenominator = amount;

      numeratorRootValue = parseFloat(
        divideNumerator ** (numValue / nthRoot)
      ).toFixed(3);
      denominatorRootValue = parseFloat(
        divideDenominator ** (numValue / nthRoot)
      ).toFixed(3);

      const solvedValues =
        (numeratorRootValue - denominatorRootValue) / denominatorRootValue;
      percentageRate = parseFloat(solvedValues * percent).toFixed(1);
      r = percentageRate;
    }

    renderHtml();
  });
});

// CREATE HTML to render
const renderHtml = () => {
  const html = `

      <!-- Arrow Column -->
      <div class="arrow-col">
        <div class="arrow arrow1">➜</div>
        <div class="arrow arrow2">➜</div>
        <div class="arrow arrow3">➜</div>
        <div class="arrow arrow4">➜</div>
        <div class="arrow arrow5">➜</div>
      </div>

      <!-- Left Column -->
      <div class="left-col">
        <div class="step">
          <span class="numbox amount">${amount}</span>
          <span>x</span>
          <div class="bracket">
            <span class="thirdBracket">[</span> ${principalValue} +
            <span class="fraction">
                <span class="top varbox R">${r}</span>
                <span class="bottom"> ${percent}</span>
            </span>
            <span class="thirdBracket">]</span> <sup>${nthRoot}</sup>
          </div>
          <span>=</span>
          <span class="numbox totalAmount">${totalInterest}</span>
        </div>

        <div
          style="
            position: relative;
            left: 130px;
            display: flex;
            flex-direction: column;
            row-gap: 10px;
          "
        >
          <div class="step">
            <div class="bracket">
              <span class="thirdBracket">[</span> ${principalValue} +
              <span class="fraction">
                <span class="top varbox R">${r} </span>
                <span class="bottom">${percent}</span>
              </span>
              <span class="thirdBracket">]</span><sup>${nthRoot}</sup>
            </div>
            <span>=</span>
            <span class="fraction">
              <span class="top totalAmount">${totalInterest}</span>
              <span class="bottom amount">${amount}</span>
            </span>
          </div>

          <div class="step">
            <div class="bracket">
              <span class="thirdBracket">[</span> ${principalValue} +
              <span class="fraction">
                <span class="top varbox R">${r}</span>
                <span class="bottom">${percent}</span>
              </span>
              <span class="thirdBracket">]</span><sup>${nthRoot}</sup>
            </div>
            <span>=</span>
            <span class="fraction">
              <span class="top">${divideNumerator}</span>
              <span class="bottom">${divideDenominator}</span>
            </span>
          </div>

          <div class="dashed-container">
            <div class="bracket">
              <span class="thirdBracket">[</span> ${principalValue} +
              <span class="fraction">
                <span class="top varbox R">${r}</span>
                <span class="bottom">${percent}</span>
              </span>
              <span class="thirdBracket">]</span>
            </div>

            <span>=</span>
            <span class="fraction">
              <span class="top"><span class="numbox num6 ">${numeratorRootValue}</span></span>
              <span class="bottom"><span class="numbox num5">${denominatorRootValue}</span></span>
            </span>

            <div class="dashed-line"></div>

            <div class="step">
              <span class="blackbox-inline ">${numeratorRootValue}<sup>${nthRoot}</sup> = ${divideNumerator}<br />${denominatorRootValue}<sup>${nthRoot}</sup> = ${divideDenominator}</span>
            </div>
          </div>
        </div>

        <div class="step">
          <span class="varbox R">${r}</span>
          <span>=</span>
          <span class="fraction">
            <span class="top"><span class="numbox num1">${parseFloat(
              numeratorRootValue - denominatorRootValue
            ).toFixed(2)}</span></span>
            <span class="bottom"><span class="numbox num5">${denominatorRootValue}</span></span>
          </span>
          <span>× ${percent}</span>
          <span class="varbox R" style="margin-left: 80px">${r}</span>
          <span>=</span>
          <span class="numbox">${percentageRate}%</span>
        </div>
      </div>

      <!-- Right Column -->
      <div class="right-col">
        <div class="right-top-box">
          <img src="interesticon.png" alt="icon" />
          <div class="vertical-content">
            <span>Interest Compounded Annually</span>

            <!-- ARROW + BLACKBOX WRAPPER -->
            <div class="blackbox-container">
              <div class="long-arrow"></div>
              <div class="blackbox" style="color: #000">
                <span class="numbox amount">${amount}</span>
                <span class="numbox num3">${nthRoot}</span>
                <span class="numbox totalAmount">${totalInterest}</span>
              </div>
            </div>

            <span style="text-align: center">years</span>
          </div>
        </div>

        <div class="blackbox" style="padding-left: 35px">
           of the same sum in 2 years at<br />
          the same rate of compound interest
        </div>

        <div
          style="
            position: relative;
            left: 126px;
            display: flex;
            flex-direction: column;
            row-gap: 20px;
          "
        >
          <div class="calc-line">
            <span>=</span>
            <span class="numbox amount">${amount}</span>
            <span class="bracket">
              <span class="thirdBracket">[</span>${principalValue} +
              <span class="fraction">
                <span class="top">${percentageRate}</span>
                <span class="bottom">${percent}</span>
              </span>
              <span class="thirdBracket">]</span> <sup>${nthRoot}</sup>
            </span>
          </div>

          <div class="calc-line">
            <span>=</span>
            <span class="numbox amount">${amount}</span>
            <span>×</span>
            <span class="fraction">
              <span class="top ">${numeratorRootValue}</span>
              <span class="bottom">${denominatorRootValue}</span>
            </span>
            <span>×</span>
            <span class="fraction">
              <span class="top ">${numeratorRootValue}</span>
              <span class="bottom">${denominatorRootValue}</span>
            </span>
          </div>

          <div class="calc-line">
            <span>=</span>
            <span class="highlight">${totalInterest}</span>
          </div>
        </div>
      </div>
    `
    .split("\n")
    .join("");
  container.innerHTML = html;
};

// ===================================================================================================================================/
/******************************************************* Trigonometry Solution******************************************************* */

const container2 = document.querySelector(".container");
const inputValues2 = document.querySelectorAll(".inputValues2");

// Declaring Variables
let ac = 0;
let bc = 0;
let ab = 0;
let numVal = 0;
let powVal = 2;
let c = 0;
let a = 0;
let secCot = 0;
let acSqr = 0;
let abSqr = 0;
let bcSqr = 0;

// Taking Inputs
inputValues2.forEach((input) => {
  input.addEventListener("change", () => {
    const value = parseFloat(input.value);
    console.log(value);
    if (input.name === "AC") ac = value;

    if (input.name === "AB") ab = value;

    if (input.name === "BC") bc = value;

    if (ac && bc) {
      acSqr = ac;
      bcSqr = bc;
      abSqr = Math.sqrt(acSqr ** 2 - bcSqr ** 2);
      ab = abSqr.toFixed(1);
    }
    if (ab && bc) {
      abSqr = ab;
      bcSqr = bc;
      acSqr = Math.sqrt(abSqr ** 2 + bcSqr ** 2);
      ac = acSqr.toFixed(1);
    }
    if (ac && ab) {
      abSqr = ab;
      acSqr = ac;
      bcSqr = Math.sqrt(acSqr ** 2 - abSqr ** 2);
      bc = bcSqr.toFixed(1);
    }

    c = ac / bc;
    a = ab / bc;
    secCot = c + a;
    numVal = (ac - bc).toFixed(1);

    renderHtml2();
  });
});

// Rendering HTML
const renderHtml2 = () => {
  const html2 = `<div>
        <div class="explanation-box-1">
          <div class="math-box">
            <span
              style="
                background: #ed8392;
                color: black;
                padding: 4px 8px;
                border-radius: 6px;
                box-shadow: 3px 3px 4px rgba(181, 181, 181, 1.5);
              "
              >A</span
            >
            <span
              style="
                background: #b7f3f0;
                color: black;
                padding: 4px 8px;
                border-radius: 6px;
                box-shadow: 3px 3px 4px rgba(181, 181, 181, 1.5);
              "
              >C</span
            >
            -
            <span
              style="
                background: #7bc3ec;
                color: black;
                padding: 4px 8px;
                border-radius: 6px;
                box-shadow: 3px 3px 4px rgba(181, 181, 181, 1.5);
              "
              >B</span
            >
            <span
              style="
                background: #b7f3f0;
                color: black;
                padding: 4px 8px;
                border-radius: 6px;
                box-shadow: 3px 3px 4px rgba(181, 181, 181, 1.5);
              "
              >C</span
            >
            = ${numVal}
          </div>
          <div
            style="
              border: 2px solid #ccc;
              border-radius: 10px;
              background: #f2f2f2;
            "
          >
            <div class="math-box">
              <div>${ac} - ${bc} = ${numVal} &nbsp;&nbsp;&nbsp;&nbsp; ${ac}<sup>${powVal}</sup> - ${bc}<sup>${powVal}</sup> = ${ab}<sup>${powVal}</sup></div>
              <div><img src="arrow.png" alt="arrow" class="arrow-img" /></div>

              <div>${ab}, ${bc}, ${ac} is a Pythagorean triplet</div>
            </div>
          </div>
          <div class="fraction-container">
            <span
              >(Sec
              <span
                style="
                  background: #b3d8f1;
                  color: black;
                  padding: 4px 8px;
                  border-radius: 6px;
                  box-shadow: 3px 3px 4px rgba(181, 181, 181, 1.5);
                "
                >C</span
              >
              + Cot
              <span
                style="
                  background: #f79ba2;
                  color: black;
                  padding: 4px 8px;
                  border-radius: 6px;
                  box-shadow: 3px 3px 4px rgba(181, 181, 181, 1.5);
                "
                >A</span
              >) =</span
            >
            <div class="fraction">
              <div>${ac}</div>
              <div class="line-by"></div>
              <div>${bc}</div>
            </div>
            <span>&nbsp;+&nbsp;</span>
            <div class="fraction">
              <div>${ab}</div>
              <div class="line-by"></div>
              <div>${bc}</div>
            </div>
          </div>
          <div class="fraction-container" style="margin-left: 190px">
            <span>=</span>
            <div class="answer-box">${secCot}</div>
          </div>
        </div>
      </div>
      <div style="display: flex; flex-direction: column">
        <div class="triangle-diagram">
          <div class="side ab"></div>
          <div class="side bc"></div>

          <svg class="side-ac-line" width="240" height="140">
            <!-- Triangle fill -->
            <polygon
              points="0,140 0,0 240,140"
              fill="rgba(173, 216, 230, 0.2)"
            />
            <!-- Hypotenuse line (AC) -->
            <line
              x1="0"
              y1="0"
              x2="240"
              y2="140"
              stroke="black"
              stroke-width="4"
            />
          </svg>

          <div class="label point-a">A</div>
          <div class="label point-b">B</div>
          <div class="label point-c">C</div>
          <div class="dimension ab-label">${ab} cm</div>
          <div class="dimension bc-label">${bc} cm</div>
          <div class="dimension ac-label">${ac} cm</div>
        </div>
        <div class="formulaBoxUltimate">
          <div class="formula-table" style="border-radius: 10px 10px 0px 0px">
            <div class="fraction-container">
              Sec
              <span
                style="
                  background: #b3d8f1;
                  color: black;
                  padding: 4px 8px;
                  border-radius: 6px;
                "
                >C</span
              >
              =
              <div class="fraction">
                <div>Hypotenuse</div>
                <div class="linel-by"></div>
                <div>Base</div>
              </div>
            </div>
          </div>
          <div class="formula-table" style="border-radius: 0px 0px 10px 10px">
            <div class="fraction-container">
              Cot
              <span
                style="
                  background: #f79ba2;
                  color: black;
                  padding: 4px 8px;
                  border-radius: 6px;
                "
                >A</span
              >
              =
              <div class="fraction">
                <div>Perpendicular</div>
                <div class="linel-by"></div>
                <div>Base</div>
              </div>
            </div>
          </div>
        </div>
      </div>`;

  container2.innerHTML = html2;
};
