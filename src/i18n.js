import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { register } from 'timeago.js'
i18n.use(initReactI18next).init({
    resources: {
        en: {
            translations: {
                'Sign Up': 'Sign Up',
                'Password mismatch':'Pasword Mismatch',
                'Username' :'Username',
                'Display Name': 'Display Name',
                'Password': 'Password',
                'Password Repeat': 'Password Repeat',
                'Login': 'Login',
                'Logout' : 'Logout',
                'My Profile': 'My Profile',
                'Users':'Users',
                '< Previous' : '< Previous',
                'Next >' : 'Next >',
                'Load Failure': 'Load Failure',
                'User not found': 'User Not Found',
                'Edit':'Edit',
                'Save':'Save',
                'Cancel':'Cancel',
                'Change Display Name':'Change Display Name',
                'There are no hoaxes.':'There are no hoaxes.',
                'Load old hoaxes':'Load old hoaxes',
                'There are new hoaxes.': 'There are new hoaxes.',
                'Are you sure to delete hoax?':'Are you sure to delete hoax?',
                'Delete Hoax': 'Delete Hoax',
                'Delete My Account':'Delete My Account',
                'Are you sure to delete your account?':'Are you sure to delete your account?'
            }
        },
        tr: {
            translations: {
                'Sign Up': 'Kaydol',
                'Password mismatch':'Tekrar Edilen Şifre Eşleşmiyor',
                'Username' :'Kullanıcı Adı',
                'Display Name': 'Tercih Edilen İsim',
                'Password': 'Parola',
                'Password Repeat': 'Parolayı Yeniden Girin',
                'Login': 'Giriş Yap',
                'Logout' : 'Çıkış Yap',
                'My Profile': 'Hesabım',
                'Users':'Kullanıcılar',
                '< Previous' :'< Önceki',
                'Next >' : 'Sonraki >',
                'Load Failure':'Veri Alınamadı',
                'User not found': 'Kullanıcı Bulunamadı',
                'Edit':'Düzenle',
                'Save':'Kaydet',
                'Cancel':'Vazgeç',
                'Change Display Name':'Görünür Adınızı Değiştirin',
                'There are no hoaxes.':'Hoax bulunamadı',
                'Load old hoaxes':'Geçmiş hoaxları yükle',
                'There are new hoaxes.' : 'Yeni Hoaxlar var',
                'Are you sure to delete hoax?':'Hoaxu silmek istediğinizden emin misiniz?',
                'Delete Hoax': 'Hoaxu sil',
                'Delete My Account' :'Hesabımı sil',
                'Are you sure to delete your account?':'Hesabınızı silmek istediğinizden emin misiniz?'

            }
        }
    },
    fallbackLng:'en',
    ns:['translations'],
    defaultNS: 'translations',
    keySeparator: false,
    interpolation:{
        escapeValue:false,
        formatSeparator: ','
    },
    react:{
        wait:true
    }

})

const timeagoTR = (number, index)=> {
    return [
      ['az önce', 'şimdi'],
      ['%s saniye önce', '%s saniye içinde'],
      ['1 dakika önce', '1 dakika içinde'],
      ['%s dakika önce', '%s dakika içinde'],
      ['1 saat önce', '1 saat içinde'],
      ['%s saat önce', '%s saat içinde'],
      ['1 gün önce', '1 gün içinde'],
      ['%s gün önce', '%s gün içinde'],
      ['1 hafta önce', '1 hafta içinde'],
      ['%s hafta önce', '%s hafta içinde'],
      ['1 ay önce', '1 ay içinde'],
      ['%s ay önce', '%s ay içinde'],
      ['1 yıl önce', '1 yıl içinde'],
      ['%s yıl önce', '%s yıl içinde'],
    ][index];
  }
register('tr', timeagoTR)


export default i18n