const fileInput = document.getElementById("file-input");

var _data = null;

let chart = null;

fileInput.onchange = () => {
  const selectedFiles = [...fileInput.files];

  const file = selectedFiles[0];

  if (!file.name.endsWith(".json")) {
    return alert("Invalid file type! Only JSON is allowed.");
  }

  const fileReader = new FileReader();

  fileReader.readAsText(selectedFiles[0]);

  fileReader.onload = function () {
    resultComplete(true, fileReader.result);
  };

  fileReader.onerror = function () {
    resultComplete(false, fileReader.error);
  };
};

function onChange() {
  const opt = document.getElementById("graph-type");

  const type = opt.options[opt.selectedIndex].value;
  if (chart != null) chart.destroy();
  chart = new Chart(document.getElementById("chart"), {
    type: type,
    data: _data,
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

function resultComplete(ready, data) {
  if (!ready) {
    console.log(data);
    alert("Error occurred, please check console.");
    return;
  }

  document.getElementById("graph").style.visibility = "visible";

  const newData = JSON.parse(data);
  const opt = document.getElementById("graph-type");

  _data = newData;

  const type = opt.options[opt.selectedIndex].value;

  if (chart != null) chart.destroy();

  chart = new Chart(document.getElementById("chart"), {
    type: type,
    data: newData,
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}
