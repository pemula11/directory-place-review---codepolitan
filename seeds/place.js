const mongoose = require('mongoose');
const Place = require('../models/place');

mongoose.connect('mongodb://127.0.0.1/bestpoints')
    .then((result) => {
        console.log('connected to mongodb')
    }).catch((err) => {
        console.log(err)
    });

async function seedPlaces() {
        const places = [
            {
                title: 'Taman Mini Indonesia Indah',
                price: 20000,
                description: 'Taman hiburan keluarga dengan berbagai replika bangunan dari seluruh Indonesia',
                location: 'Taman Mini Indonesia Indah, Jakarta',
                image: 'https://images.unsplash.com/photo-1505276283852-93f9ae227586?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI5OTZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjM0Nzg3OTN8&ixlib=rb-4.0.3&q=80&w=1080'
            },
            {
                title: 'Pantai Kuta',
                price: 0,
                description: 'Pantai yang terkenal di Bali dengan pemandangan sunset yang indah',
                location: 'Pantai Kuta, Kuta, Badung Regency, Bali',
                image: 'https://images.unsplash.com/photo-1505276283852-93f9ae227586?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI5OTZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjM0Nzg3OTN8&ixlib=rb-4.0.3&q=80&w=1080'
            },
            {
                title: 'Borobudur',
                price: 0,
                description: 'Candi Buddha terbesar di dunia yang terletak di Magelang, Jawa Tengah',
                location: 'Borobudur, Magelang, Central Java',
                image: 'https://images.unsplash.com/photo-1505276283852-93f9ae227586?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI5OTZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjM0Nzg3OTN8&ixlib=rb-4.0.3&q=80&w=1080'
            },
            {
                title: 'Kawah Putih',
                price: 0,
                description: 'Kawah vulkanik dengan danau berwarna putih di Bandung, Jawa Barat',
                location: 'Kawah Putih, Ciwidey, West Java',
                image: 'https://images.unsplash.com/photo-1505276283852-93f9ae227586?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI5OTZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjM0Nzg3OTN8&ixlib=rb-4.0.3&q=80&w=1080'
            },
            {
                title: 'Malioboro',
                price: 0,
                description: 'Jalan utama di Yogyakarta dengan berbagai toko dan kuliner khas',
                location: 'Jl. Malioboro, Yogyakarta City, Special Region of Yogyakarta',
                image: 'https://images.unsplash.com/photo-1505276283852-93f9ae227586?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI5OTZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjM0Nzg3OTN8&ixlib=rb-4.0.3&q=80&w=1080'
            },
            {
                title: 'Pantai Tanjung Aan',
                price: 10000,
                description: 'Pantai dengan pasir berwarna putih dan air laut yang jernih di Lombok, Nusa Tenggara Barat',
                location: 'Pantai Tanjung Aan, Lombok, West Nusa Tenggara',
                image: 'https://images.unsplash.com/photo-1505276283852-93f9ae227586?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI5OTZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjM0Nzg3OTN8&ixlib=rb-4.0.3&q=80&w=1080'
            },
            {
                title: 'Bukit Bintang',
                price: 0,
                description: 'Kawasan perbelanjaan dan hiburan di Kuala Lumpur, Malaysia',
                location: 'Bukit Bintang, Kuala Lumpur, Federal Territory of Kuala Lumpur, Malaysia',
                image: 'https://images.unsplash.com/photo-1505276283852-93f9ae227586?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI5OTZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjM0Nzg3OTN8&ixlib=rb-4.0.3&q=80&w=1080'
            },
            {
                title: 'Candi Prambanan',
                price: 25000,
                description: 'Candi Hindu terbesar di Indonesia yang terletak di Yogyakarta',
                location: 'Candi Prambanan, Sleman, Special Region of Yogyakarta',
                image: 'https://images.unsplash.com/photo-1505276283852-93f9ae227586?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI5OTZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjM0Nzg3OTN8&ixlib=rb-4.0.3&q=80&w=1080'
            },
            {
                title: 'Danau Toba',
                price: 0,
                description: 'Danau vulkanik terbesar di Indonesia yang terletak di Sumatera Utara',
                location: 'Danau Toba, North Sumatra',
                image: 'https://images.unsplash.com/photo-1505276283852-93f9ae227586?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI5OTZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjM0Nzg3OTN8&ixlib=rb-4.0.3&q=80&w=1080'
            },
            {
                title: 'Kawah Ijen',
                price: 100000,
                description: 'Kawah vulkanik dengan fenomena blue fire di Banyuwangi, Jawa Timur',
                location: 'Kawah Ijen, Banyuwangi, East Java',
                image: 'https://images.unsplash.com/photo-1505276283852-93f9ae227586?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI5OTZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjM0Nzg3OTN8&ixlib=rb-4.0.3&q=80&w=1080'
            },
            {
                title: 'Pantai Sanur',
                price: 0,
                description: 'Pantai di Bali yang cocok untuk berenang dan melihat matahari terbit',
                location: 'Pantai Sanur, Denpasar, Bali',
                image: 'https://images.unsplash.com/photo-1505276283852-93f9ae227586?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI5OTZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjM0Nzg3OTN8&ixlib=rb-4.0.3&q=80&w=1080'
            },
    
            {
                title: 'Candi Borobudur',
                price: 25000,
                description: 'Candi Buddha terbesar di dunia yang terletak di Magelang, Jawa Tengah',
                location: 'Candi Borobudur, Borobudur, Magelang, Central Java',
                image: 'https://images.unsplash.com/photo-1505276283852-93f9ae227586?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI5OTZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjM0Nzg3OTN8&ixlib=rb-4.0.3&q=80&w=1080'
            },
            {
                title: 'Pulau Komodo',
                price: 5000000,
                description: 'Pulau di Indonesia yang terkenal dengan komodo, hewan terbesar di dunia',
                location: 'Pulau Komodo, East Nusa Tenggara',
                image: 'https://images.unsplash.com/photo-1505276283852-93f9ae227586?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI5OTZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjM0Nzg3OTN8&ixlib=rb-4.0.3&q=80&w=1080'
            },
            {
                title: 'Taman Nasional Gunung Rinjani',
                price: 150000,
                description: 'Taman nasional yang terletak di Lombok dan memiliki gunung tertinggi kedua di Indonesia',
                location: 'Taman Nasional Gunung Rinjani, Lombok, West Nusa Tenggara',
                image: 'https://images.unsplash.com/photo-1505276283852-93f9ae227586?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI5OTZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjM0Nzg3OTN8&ixlib=rb-4.0.3&q=80&w=1080'
            },
            {
                title: 'Bukit Tinggi',
                price: 0,
                description: 'Kota kecil yang terletak di Sumatera Barat dengan arsitektur khas Eropa',
                location: 'Bukit Tinggi, West Sumatra',
                image: 'https://images.unsplash.com/photo-1505276283852-93f9ae227586?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI5OTZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjM0Nzg3OTN8&ixlib=rb-4.0.3&q=80&w=1080'
            },
            {
                title: 'Pulau Weh',
                price: 0,
                description: 'Pulau yang terletak di ujung barat Indonesia dengan keindahan bawah laut yang luar biasa',
                location: 'Pulau Weh, Sabang, Aceh',
                image: 'https://images.unsplash.com/photo-1505276283852-93f9ae227586?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI5OTZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjM0Nzg3OTN8&ixlib=rb-4.0.3&q=80&w=1080'
            },
            {
                title: 'Taman Safari Indonesia',
                price: 0,
                description: 'Taman hiburan keluarga dengan berbagai satwa liar di Cisarua, Bogor',
                location: 'Taman Safari Indonesia, Cisarua, West Java',
                image: 'https://images.unsplash.com/photo-1505276283852-93f9ae227586?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI5OTZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjM0Nzg3OTN8&ixlib=rb-4.0.3&q=80&w=1080'
            },
            {
                title: 'Gunung Merbabu',
                price: 50000,
                description: 'Gunung yang terletak di Jawa Tengah dengan pemandangan matahari terbit yang indah',
                location: 'Gunung Merbabu, Central Java',
                image: 'https://images.unsplash.com/photo-1505276283852-93f9ae227586?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI5OTZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjM0Nzg3OTN8&ixlib=rb-4.0.3&q=80&w=1080'
            },
            {
                title: 'Pulau Lombok',
                price: 0,
                description: 'Pulau di Indonesia yang terkenal dengan keindahan pantainya',
                location: 'Pulau Lombok, West Nusa Tenggara',
                image: 'https://images.unsplash.com/photo-1505276283852-93f9ae227586?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI5OTZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjM0Nzg3OTN8&ixlib=rb-4.0.3&q=80&w=1080'
            },
            {
                title: 'Tanjung Lesung',
                price: 100000,
                description: 'Kawasan wisata pantai di Banten yang cocok untuk bersantai dan berenang',
                location: 'Tanjung Lesung, Pandeglang, Banten',
                image: 'https://images.unsplash.com/photo-1505276283852-93f9ae227586?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI5OTZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjM0Nzg3OTN8&ixlib=rb-4.0.3&q=80&w=1080'
            }
        ]


    
    try{
        const newPlaces = places.map(place => {
            return { ...place, author: '66bba36f0606c5cf14a23575'}
        })
        await Place.deleteMany({});
        await Place.insertMany(newPlaces);
        console.log('Places seeded successfully');
    }
    catch(err){
        console.log(err);
    }
    finally{
        mongoose.connection.close();
    }
}

seedPlaces();