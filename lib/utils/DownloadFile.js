import {PermissionsAndroid, Platform} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

export const DownloadFile = async (link, setIsLoading) => {
  // console.log('Ready to download file!', link);
  const {
    dirs: {DownloadDir, DocumentDir},
  } = RNFetchBlob.fs;
  const {config} = RNFetchBlob;
  const isIOS = Platform.OS === 'ios';
  const aPath = Platform.select({ios: DocumentDir, android: DownloadDir});
  // const ext = 'pdf';
  const file_ex = link.split('/').reverse()[0];
  const fPath = `${aPath}/${file_ex}`;
  const configOption = Platform.select({
    ios: {
      fileCache: true,
      path: fPath,
      appendExt: 'pdf',
    },
    android: {
      fileCache: true,
      appendExt: 'pdf',
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path: aPath + '/' + file_ex,
        description: 'Downloading file.',
      },
    },
  });
  if (isIOS) {
    config(configOption)
      .fetch('GET', link)
      .then((res) => {
        setIsLoading(false);
        console.log('File ', res);
        RNFetchBlob.ios.previewDocument(res.path());
        return;
      });
  } else {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission Request',
          message: 'App needs access to your storage to download file',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        config(configOption)
          .fetch('GET', link)
          .then((res) => {
            setIsLoading(false);
            console.log('file_dowload ', JSON.stringify(res));
            RNFetchBlob.android.actionViewIntent(res.path());
            return;
          });
      } else {
        setIsLoading(false);
        console.log('Storage Permission Not Granted');
      }
    } catch (error) {
      setIsLoading(false);
      console.log('error', error);
    }
  }
};
