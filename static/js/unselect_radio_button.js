let radios = document.getElementsByTagName('input');
      for(i = 0; i < radios.length; i++) {
        radios[i].onclick = function(e) {
          this.checked = !this.checked;
        }
      }