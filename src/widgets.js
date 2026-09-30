export function createWidgets(progress) {
  return {
    SendCoin(el, props, done) {
      let n = 0;

      const steps = props.steps || [];

      function draw() {
        const existingOutput = el.querySelector(".out");

        const outputHTML = existingOutput ? existingOutput.innerHTML : "";

        el.innerHTML = `
                    <span class="label">Try it</span>

                    <div class="out">
                        ${outputHTML}
                    </div>

                    <div>
                        ${
                          n < steps.length
                            ? `<button data-send>
                                    ${steps[n].btn}
                                   </button>`
                            : ""
                        }

                        <button class="ghost" data-reset>
                            Start over
                        </button>
                    </div>
                `;
      }

      el.classList.add("try");

      draw();

      el.onclick = (event) => {
        if (event.target.dataset.send !== undefined) {
          const output = el.querySelector(".out");

          output.insertAdjacentHTML("beforeend", `<p>${steps[n].line}</p>`);

          n++;

          if (n === steps.length) {
            done();
          }

          const html = output.innerHTML;

          draw();

          el.querySelector(".out").innerHTML = html;
        }

        if (event.target.dataset.reset !== undefined) {
          n = 0;

          const output = el.querySelector(".out");

          output.innerHTML = "";

          draw();
        }
      };
    },

    Ledger(el, props, done) {
      el.classList.add("try");

      let balances;

      function init() {
        balances = [props.coins, ...(props.payees || []).map(() => 0)];
      }

      function draw(message) {
        const people = [props.owner, ...(props.payees || [])];

        el.innerHTML = `
                    <span class="label">Try it</span>

                    <table>
                        <tr>
                            <th>
                                ${props.keeper}’s notebook
                            </th>

                            <th>
                                Coins
                            </th>
                        </tr>

                        ${people
                          .map(
                            (name, index) => `
                                <tr>
                                    <td>${name}</td>
                                    <td>${balances[index]}</td>
                                </tr>
                            `,
                          )
                          .join("")}
                    </table>

                    <div>
                        ${(props.payees || [])
                          .map(
                            (name, index) => `
                                    <button data-pay="${index + 1}">
                                        Pay ${name}
                                    </button>
                                `,
                          )
                          .join("")}

                        <button class="ghost" data-reset>
                            Start over
                        </button>
                    </div>

                    <div class="msg">
                        ${message || ""}
                    </div>
                `;

        el.querySelectorAll("[data-pay]").forEach((button) => {
          button.onclick = () => {
            const index = Number(button.dataset.pay);

            if (balances[0] >= 1) {
              balances[0]--;
              balances[index]++;

              draw(`${props.keeper}: “Done.”`);
            } else {
              draw(
                `${props.keeper}: “You have nothing left to pay with. Sorry.”`,
              );

              done();
            }
          };
        });

        const reset = el.querySelector("[data-reset]");

        if (reset) {
          reset.onclick = () => {
            init();
            draw();
          };
        }
      }

      init();
      draw();
    },
  };
}
