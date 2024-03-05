export function setCookie(cname, cvalue, exdays = 3) {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
    if (window.location.origin.includes("/")) {
      document.cookie = cname + "=" + cvalue + ";" + expires + `; path=/;`;
    } else {
      document.cookie =
        cname +
        "=" +
        cvalue +
        ";" +
        expires +
        `; path=/; domain=${window.location.hostname}`;
    }
  }
  
  export function getCookie(cname, cookie) {
    let name = cname + "=";
    let tousecookie = cookie || document.cookie;
    let ca = tousecookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  
  export function deleteCookie(cname) {
    const date = new Date();
  
    date.setTime(date.getTime() + -1 * 24 * 60 * 60 * 1000);
  
    document.cookie = cname + "=; expires=" + date.toUTCString() + "; path=/";
  }