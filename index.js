let testObject = document.getElementById("testObject");

let speedElem = document.getElementById("speedPara");
let angleElem = document.getElementById("anglePara");
let AccX = document.getElementById("AccX");
let AccY = document.getElementById("AccY");
let GoBtn = document.getElementById("GoBtn");
let currentCoordinate = document.getElementById('currentCoordinate');
let currentSpeedElem = document.getElementById('Speed');
let TimeElem = document.getElementById('Time');
let canva = document.getElementById('canva');

for (let index = 0; index < 2000; index = index + 50) {
  let coordinateX = document.createElement('div')
  let coordinateY = document.createElement('div')
  coordinateX.className = 'coordinate'
  coordinateY.className = 'coordinate'
  coordinateY.style.bottom = index + "px";
  coordinateX.style.left = index + 50 + "px";
  coordinateX.style.bottom = "0px";
  coordinateY.innerHTML = `-${index}`
  coordinateX.innerHTML = `${index + 50}<br>&nbsp|`
  canva.append(coordinateX)
  canva.append(coordinateY)
}

function coordinates() {
  var rect = testObject.getBoundingClientRect();
  var parentRect = testObject.parentElement.getBoundingClientRect();
  var relativeX = rect.left - parentRect.left;
  var relativeY = rect.top - parentRect.top;
  return [relativeX, relativeY];
}

function Travel(
  distanceL = 1500,
  initialSpeed = 0,
  accelerationX = 0,
  accelerationY = -9.8,
  angle = 0
) {
  let initialX = 0; // Get the initial X position
  let initialY = 0; // Get the initial X position
  console.log(initialX, initialY);
  let startTime = new Date().getTime();
  let currentTime;
  let elapsedTime;
  let newPosition;

  let MotionCondition=true;
  if (initialSpeed==0 && accelerationX==0 &&accelerationY==0) {
    MotionCondition=false;
  }
  else if (initialSpeed==0  &&accelerationY<=0) {
    MotionCondition=false;
  }
  console.log(accelerationY)
  if (angle==0) {
    accelerationY=0;
  }

  function animate() {
    currentTime = new Date().getTime();
    elapsedTime = (currentTime - startTime) / 1000; // convert to seconds

    let SpeedX = initialSpeed * Math.cos((3.14159 / 180) * angle);
    let SpeedY = initialSpeed * Math.sin((3.14159 / 180) * angle);

    let displacementX =
      SpeedX * elapsedTime + 0.5 * accelerationX * elapsedTime ** 2;
    let displacementY =
      SpeedY * elapsedTime + 0.5 * accelerationY * elapsedTime ** 2;
    // Ensure that the object doesn't go beyond the target distance
    newPositionX = Math.min(initialX + displacementX, initialX + distanceL);
    newPositionY = Math.min(initialY + displacementY, initialY + distanceL);
    testObject.style.left = newPositionX + "px";
    testObject.style.bottom = newPositionY + "px";
    let currentSpeed=initialSpeed
    if (Math.sign(accelerationX)!=0 && Math.sign(accelerationY)!=0) {
      currentSpeed=Math.sqrt(Math.abs((initialSpeed**2)+2*Math.sqrt(
        ((accelerationX**2)+(accelerationY**2))
        *((newPositionX**2)+(newPositionY**2))
        )));
    }
    else if(Math.sign(accelerationX)==0 && Math.sign(accelerationY)!=0){
      currentSpeed=currentSpeed=Math.sqrt(Math.abs((initialSpeed**2)+2*Math.sqrt(
        ((accelerationX**2)+(accelerationY**2))
        *((newPositionX**2)+(newPositionY**2))
        )*Math.sign(accelerationY)));    
    }
    else if(Math.sign(accelerationX)!=0 && Math.sign(accelerationY)==0){
      currentSpeed=Math.sqrt(Math.abs((initialSpeed**2)+2*Math.sqrt(
        ((accelerationX**2)+(accelerationY**2))
        *((newPositionX**2)+(newPositionY**2))
        )*Math.sign(accelerationX)));
    }
    currentCoordinate.innerHTML = `<div>X: ${parseInt(newPositionX)}</div><div>Y: ${parseInt(newPositionY)}</div>`
    currentSpeedElem.innerText=`Speed: ${Math.ceil(currentSpeed)}`
    TimeElem.innerText=`Time: ${parseInt(elapsedTime)}sec`
    if (
      newPositionX < initialX + distanceL - 20 &&
      newPositionY < 1500 &&
      newPositionY >=0  && MotionCondition==true
    ) {
      // testObject.style.animation = "Rotate 3s linear infinite";
      requestAnimationFrame(animate);
      testObject.className = "animate";
    } else {
      let endTime = new Date().getTime();
      let motionDuration = (endTime - startTime) / 1000;
      testObject.className = "none";
      console.log("Motion duration:", motionDuration);
      console.log("Final position:", [newPositionX, newPositionY]);
      // testObject.style.left=`0px`
      // testObject.style.bottom=`0px`
    }
  }

  requestAnimationFrame(animate);
}
//set the default values
// speedElem.value=0;
// AccX.value=0;
// AccY.value=-9.8;
// angleElem.value=0;
GoBtn.addEventListener("click", function (event) {
  event.preventDefault();
  setTimeout(() => {
    Travel(2000, speedElem.value, AccX.value, AccY.value, angleElem.value); // (distanceL, initialSpeed, accelerationX,accelerationY, angle)
  }, 500);
});
