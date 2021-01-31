const Library = window.MyLibrary.default;

const instances = [new Library('#svg1'), new Library('#svg2'), new Library('#svg3'), new Library('#svg4')];

let show = false;
instances.forEach((instance) => {
  instance.show();
});

setInterval(() => {
  if (show) {
    instances.forEach((instance) => {
      instance.show();
    });
  } else {
    instances.forEach((instance) => {
      instance.hide();
    });
  }

  show = !show;
}, 3000);
