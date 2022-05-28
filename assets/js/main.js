/* Battery */
initBattery();

function initBattery() {
  const batteryLiquid = document.querySelector(".battery-liquid"),
    batteryStatus = document.querySelector(".battery-status"),
    batteryPercentage = document.querySelector(".battery-percentage");

  navigator.getBattery().then((battery) => {
    updateBattery = () => {
      // - Update The Number Level Of The Battery
      let level = Math.floor(battery.level * 100);
      batteryPercentage.innerHTML = level + "%";

      // - Update The Background Level Of The Battery
      batteryLiquid.style.height = `${parseInt(battery.level * 100)}%`;

      // - Validate Full Battery, Low Battery, And If It Is Charging Or Not
      if (level == 100) {
        batteryStatus.innerHTML = `Full Battery <i class="ri-battery-2-fill green-color"></i>`;

        batteryLiquid.style.height = "103%"; // To Hide The Ellipse

        // Validate If The Battery Is Low
      } else if ((level <= 20) & !battery.charging) {
        batteryStatus.innerHTML = `Low Battery <i class="ri-plug-line animated-red"></i>`;

        // Validate If The Battery Is Charging
      } else if (battery.charging) {
        batteryStatus.innerHTML = `Charging... <i class="ri-flashlight-line animated-green"></i>`;

        // If It Is Not Loading...Don’t Show Anything
      } else {
        batteryStatus.innerHTML = "";
      }

      // Change The Colors Of The Battery And Remove The Other Colors
      if (level <= 20) {
        batteryLiquid.classList.add("gradient-color-red");
        batteryLiquid.classList.remove(
          "gradient-color-orange",
          "gradient-color-yellow",
          "gradient-color-green"
        );
      } else if (level <= 40) {
        batteryLiquid.classList.add("gradient-color-orange");
        batteryLiquid.classList.remove(
          "gradient-color-red",
          "gradient-color-yellow",
          "gradient-color-green"
        );
      } else if (level <= 80) {
        batteryLiquid.classList.add("gradient-color-yellow");
        batteryLiquid.classList.remove(
          "gradient-color-orange",
          "gradient-color-red",
          "gradient-color-green"
        );
      } else {
        batteryLiquid.classList.add("gradient-color-green");
        batteryLiquid.classList.remove(
          "gradient-color-orange",
          "gradient-color-yellow",
          "gradient-color-red"
        );
      }
    };

    updateBattery();

    // - Battery Status Events
    battery.addEventListener("chargingchange", () => {
      updateBattery();
    });

    battery.addEventListener("levelchange", () => {
      updateBattery();
    });
  });
}
