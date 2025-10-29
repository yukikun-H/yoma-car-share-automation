module.exports = {
  src_folders: ['src/tests'],
  page_objects_path: ['src/pages'],
  test_settings: {
    default: {
      launch_url: 'https://carshare.yomafleet.com',
      desiredCapabilities: {
        browserName: 'chrome'
      }
    }
  },
  test_runner: {
    type: 'mocha',
    options: {
      ui: 'bdd',
      reporter: 'spec'
    }
  },
  webdriver: {
    start_process: true,
    server_path: ''
  }
};
