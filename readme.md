Bu proje, bir React uygulaması olarak havalimanı araması yapmaya olanak tanır. Kullanıcı bir arama sorgusu girdiğinde, uygulama debounce mekanizması ile API'ye istek gönderir ve sonuçları liste halinde görüntüler. API, ElasticSearch tabanlı bir backend sunucusundan veri alır.

Özellikler:
- Gerçek Zamanlı Arama: Kullanıcı girişine göre sonuçları canlı olarak getirir.
- Debounce Mekanizması: Gereksiz API çağrılarını azaltır.
- İstek İptali: Eski istekleri iptal ederek performansı artırır.
- Listeleme: API'den alınan sonuçlar, havalimanı isimleri ile bir liste olarak görüntülenir.

Kullanılan Teknolojiler:
- React.js: Kullanıcı arayüzü oluşturmak için.
- Lodash: debounce fonksiyonu için.
- Axios: HTTP istekleri için.
- ElasticSearch: Backend tarafından kullanılan arama altyapısı.

Kurulum
Docker demon açıldıktan sonra "docker-compose up --build" çalıştırmanız yeterli.
