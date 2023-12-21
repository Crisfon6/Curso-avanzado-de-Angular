const getMenuFT = (role = 'USER_ROLE')=>{
    const menu= [
        {
          title: 'Dashboard',
          icon: 'mdi mdi-gauge',
          submenu: [
            { title: 'Main', url: '/' },
            { title: 'ProgressBar', url: 'progress' },
            { title: 'Charts', url: 'grafica1' },
            { title: 'Promises', url: 'promises' },
            { title: 'Rxjs', url: 'rxjs' },
          ],
        },
        {
          title: 'Mantains',
          icon: 'mdi mdi-folder-lock-open',
          submenu: [
            // { title: 'User', url: 'users' },
            { title: 'Hospitals', url: 'hospitals' },
            { title: 'Doctors', url: 'doctors' },
          ],
        },
      ];
      if(role ==='ADMIN_ROLE'){
        menu[1].submenu.unshift({ title: 'User', url: 'users' },);
      }
      return menu;
}
module.exports = {
    getMenuFT
}