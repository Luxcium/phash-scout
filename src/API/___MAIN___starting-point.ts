import { USEWORKER, VERBOSA } from '../constants';
import { isDir } from '../tools';
import { sideFunctionBuilder } from './sideFunctionBuilder';
import { doTraverseDirs } from './sync-directory-traversal';

function main() {
  const flags = {
    isOpenDirSYNC: true,
    isReadSYNC: true,
    isCloseDirSYNC: false,
    VERBOSE: false,
    DEBUGS: true,
  };
  const counts = { await: 0 };
  dirList.map(async traverseDir => {
    const times: number[] = [];
    if (await isDir(traverseDir)) {
      const sideFunction = sideFunctionBuilder(
        times,
        USEWORKER,
        VERBOSA.sideFunction
      );
      await doTraverseDirs(traverseDir, sideFunction, flags, counts);
    }
  });
}

// void (async function __MAIN__(traverseDir: string) {
//   const times: number[] = [];
//   if (await isDir(traverseDir)) {
//     // const RC = Rc();
//     const sideFunction = sideFunctionBuilder(times);
//     doTraverseDirs(traverseDir, sideFunction, flags, counts);
//   }
// })(localFolderAbsolutePath);

/*
.
..
"/media/luxcium/01a90322-9216-4729-85ce-6949708e69b6/577-images.zip"
"/media/luxcium/01a90322-9216-4729-85ce-6949708e69b6/archives"
"/media/luxcium/01a90322-9216-4729-85ce-6949708e69b6/CV 2014 v2 2.pdf"
"/media/luxcium/01a90322-9216-4729-85ce-6949708e69b6/CV 2014 v2.pdf"
"/media/luxcium/01a90322-9216-4729-85ce-6949708e69b6/~deleteme"
"/media/luxcium/01a90322-9216-4729-85ce-6949708e69b6/.directory"
"/media/luxcium/01a90322-9216-4729-85ce-6949708e69b6/DJ MUSIC"
"/media/luxcium/01a90322-9216-4729-85ce-6949708e69b6/downloads"
"/media/luxcium/01a90322-9216-4729-85ce-6949708e69b6/gnupg_Archive"
"/media/luxcium/01a90322-9216-4729-85ce-6949708e69b6/gnupg_Archive.zip"
"/media/luxcium/01a90322-9216-4729-85ce-6949708e69b6/IMG_2374.JPG"
"/media/luxcium/01a90322-9216-4729-85ce-6949708e69b6/jpgs_ipn_impt_2022-02-04"
"/media/luxcium/01a90322-9216-4729-85ce-6949708e69b6/luxcium-backup"
"/media/luxcium/01a90322-9216-4729-85ce-6949708e69b6/macBook-home-backup"
"/media/luxcium/01a90322-9216-4729-85ce-6949708e69b6/mack-book-home-folder-Archive.zip"
"/media/luxcium/01a90322-9216-4729-85ce-6949708e69b6/mp4s_ipn_impt_2022-02-04"
"/media/luxcium/01a90322-9216-4729-85ce-6949708e69b6/npm_recovery_codes.txt"
"/media/luxcium/01a90322-9216-4729-85ce-6949708e69b6/partage-reseau"
"/media/luxcium/01a90322-9216-4729-85ce-6949708e69b6/recent backups (Jully 2022)"
"/media/luxcium/01a90322-9216-4729-85ce-6949708e69b6/redis"
"/media/luxcium/01a90322-9216-4729-85ce-6949708e69b6/rescue-2022-02-12"
"/media/luxcium/01a90322-9216-4729-85ce-6949708e69b6/results.txt"
"/media/luxcium/01a90322-9216-4729-85ce-6949708e69b6/showFiles"
"/media/luxcium/01a90322-9216-4729-85ce-6949708e69b6/Telegram Desktop"
"/media/luxcium/01a90322-9216-4729-85ce-6949708e69b6/Telegram-Desktop--already-images-processed"
"/media/luxcium/01a90322-9216-4729-85ce-6949708e69b6/.Trash-1000"
"/media/luxcium/01a90322-9216-4729-85ce-6949708e69b6/△▽ Unknown"
"/media/luxcium/01a90322-9216-4729-85ce-6949708e69b6/video_files-ChatExport_2022-05-18"

 */

// const argv = process.argv.slice(2);
// const localFolderAbsolutePath =
//   argv.slice(-1)[0] || '/media/luxcium/Archive_Locale/import/';

// /media/luxcium/01a90322-9216-4729-85ce-6949708e69b6/archives

const dirList = [
  '/tmp/jpgs',
  // '/media/luxcium/Archive_Locale/import/',
  // '/media/luxcium/01a90322-9216-4729-85ce-6949708e69b6/downloads',
  /*
  '/media/luxcium/01a90322-9216-4729-85ce-6949708e69b6/unknown',
    '/media/luxcium/01a90322-9216-4729-85ce-6949708e69b6/jpgs_ipn_impt_2022-02-04',
    '/media/luxcium/01a90322-9216-4729-85ce-6949708e69b6/recent backups (Jully 2022)',
    '/media/luxcium/01a90322-9216-4729-85ce-6949708e69b6/Telegram Desktop',
    '/media/luxcium/01a90322-9216-4729-85ce-6949708e69b6/Telegram-Desktop--already-images-processed',
  */
  // '/media/luxcium/01a90322-9216-4729-85ce-6949708e69b6/.directory',
  // '/media/luxcium/01a90322-9216-4729-85ce-6949708e69b6/.Trash-1000',
  // '/media/luxcium/01a90322-9216-4729-85ce-6949708e69b6/~deleteme',
  // '/media/luxcium/01a90322-9216-4729-85ce-6949708e69b6/577-images.zip',
  // '/media/luxcium/01a90322-9216-4729-85ce-6949708e69b6/archives',
  // '/media/luxcium/01a90322-9216-4729-85ce-6949708e69b6/CV 2014 v2 2.pdf',
  // '/media/luxcium/01a90322-9216-4729-85ce-6949708e69b6/CV 2014 v2.pdf',
  // '/media/luxcium/01a90322-9216-4729-85ce-6949708e69b6/DJ MUSIC',
  // '/media/luxcium/01a90322-9216-4729-85ce-6949708e69b6/gnupg_Archive.zip',
  // '/media/luxcium/01a90322-9216-4729-85ce-6949708e69b6/gnupg_Archive',
  // '/media/luxcium/01a90322-9216-4729-85ce-6949708e69b6/IMG_2374.JPG',
  // '/media/luxcium/01a90322-9216-4729-85ce-6949708e69b6/luxcium-backup',
  // '/media/luxcium/01a90322-9216-4729-85ce-6949708e69b6/macBook-home-backup',
  // '/media/luxcium/01a90322-9216-4729-85ce-6949708e69b6/mack-book-home-folder-Archive.zip',
  // '/media/luxcium/01a90322-9216-4729-85ce-6949708e69b6/mp4s_ipn_impt_2022-02-04',
  // '/media/luxcium/01a90322-9216-4729-85ce-6949708e69b6/npm_recovery_codes.txt',
  // '/media/luxcium/01a90322-9216-4729-85ce-6949708e69b6/partage-reseau',
  // '/media/luxcium/01a90322-9216-4729-85ce-6949708e69b6/redis',
  // '/media/luxcium/01a90322-9216-4729-85ce-6949708e69b6/rescue-2022-02-12',
  // '/media/luxcium/01a90322-9216-4729-85ce-6949708e69b6/results.txt',
  // '/media/luxcium/01a90322-9216-4729-85ce-6949708e69b6/showFiles',
  // '/media/luxcium/01a90322-9216-4729-85ce-6949708e69b6/video_files-ChatExport_2022-05-18',
];

main();
