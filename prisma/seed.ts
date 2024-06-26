import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {

  const country = await prisma.country.upsert({
      where: {id: 1},
      update: {},
      create: {
          id: 1,
          name: 'Indonesia'
      }
  })

  // const seedAnswers = async() : Promise<void> => {
   
  //   const questionRanges = {
  //     1: [1, 2, 3, 4],
  //     2: Array.from({ length: 11 }, (_, i) => i + 1),
  //     3: [1, 2, 3],
  //     4: [1, 2, 3, 4]
  //   };
  
  //   for (let i = 5; i <= 29; i++) {
  //     questionRanges[i] = [1, 2, 3, 4];
  //   }
  
  //   const numberOfAnswers = 50;
  //   for (var j = 0; j < numberOfAnswers; j++) {
  //     const answers = Array.from({ length: 29 }, (_, i) => randomChoice(questionRanges[i + 1]));
  //     const answersString = answers.join(',');
  //     await prisma.answer.create({

  //       data: {
  //         answer: answersString,
  //         city_id: Math.floor(Math.random() * (33 - 1 + 1)) + 1,
  //         user_id: Math.floor(Math.random() * (2 - 1 + 1)) + 1,
  //         profile: "1,2,3,1,1",
  //         total:  Math.floor(Math.random() * (60 - 1 + 1)) + 1
  //       }
  //     });
  //   }
  // }


  const upsertCities = async() => {
      const cities = [
          { province_id: 1, name: 'Banda Aceh',  },
          { province_id: 1, name: 'Langsa'},
          { province_id: 1, name: 'Lhokseumawe'},
          { province_id: 1, name: 'Sabang' },
          { province_id: 1, name: 'Subulussalam',  },
          { province_id: 2, name: 'Denpasar' },
          { province_id: 3, name: 'Pangkalpinang' },
          { province_id: 4, name: 'Cilegon' },
          { province_id: 4, name: 'Serang' },
          { province_id: 4, name: 'Tangerang Selatan' },
          { province_id: 4, name: 'Tangerang' },
          { province_id: 5, name: 'Bengkulu' },
          { province_id: 6, name: 'Yogyakarta' },
          { province_id: 7, name: 'Gorontalo' },
          { province_id: 8, name: 'Kota Administrasi Jakarta Barat' },
          { province_id: 8, name: 'Kota Administrasi Jakarta Pusat' },
          { province_id: 8, name: 'Kota Administrasi Jakarta Selatan' },
          { province_id: 8, name: 'Kota Administrasi Jakarta Timur' },
          { province_id: 8, name: 'Kota Administrasi Jakarta Utara' },
          { province_id: 9, name: 'Sungai Penuh' },
          { province_id: 9, name: 'Jambi' },
          { province_id: 10, name: 'Bandung' },
          { province_id: 10, name: 'Bekasi' },
          { province_id: 10 , name: 'Bogor' },
          { province_id: 10 , name: 'Cimahi' },
          { province_id: 10 , name: 'Cirebon' },
          { province_id: 10 , name: 'Depok' },
          { province_id: 10 , name: 'Sukabumi' },
          { province_id: 10 , name: "Tasikmalaya" },
          { province_id: 10 , name: "Banjar" },
          { province_id: 11 , name: "Magelang" },
          { province_id: 11 , name: "Pekalongan" },
          { province_id: 11 , name: "Salatiga" },
          { province_id: 11 , name: "Semarang" },
          { province_id: 11 , name: "Surakarta" },
          { province_id: 11 , name: "Tegal" },
          { province_id: 12 , name: "Batu" },
          { province_id: 12 , name: "Blitar" },
          { province_id: 12 , name: "Kediri" },
          { province_id: 12 , name: "Madiun" },
          { province_id: 12 , name: "Malang" },
          { province_id: 12 , name: "Mojokerto" },
          { province_id: 12 , name: "Pasuruan" },
          { province_id: 12 , name: "Probolinggo" },
          { province_id: 12 , name: "Surabaya" },
          { province_id: 13 , name: "Pontianak" },
          { province_id: 13 , name: "Singkawang" },
          { province_id: 14 , name: "Banjarbaru" },
          { province_id: 14 , name: "Banjarmasin" },
          { province_id: 15 , name: "Palangka Raya" },
          { province_id: 16 , name: "Balikpapan" },
          { province_id: 16 , name: "Bontang" },
          { province_id: 16 , name: "Samarinda" },
          { province_id: 16 , name: "Nusantara" },
          { province_id: 17 , name: "Tarakan" },
          { province_id: 18 , name: "Batam" },
          { province_id: 18 , name: "Tanjungpinang" },
          { province_id: 19 , name: "Bandar Lampung" },
          { province_id: 19 , name: "Metro" },
          { province_id: 20 , name: "Ternate" },
          { province_id: 20 , name: "Tidore Kepulauan" },
          { province_id: 21 , name: "Ambon" },
          { province_id: 21 , name: "Tual" },
          { province_id: 22 , name: "Bima" },
          { province_id: 22 , name: "Mataram" },
          { province_id: 23 , name: "Kupang" },
          { province_id: 25 , name: "Jayapura" },
          { province_id: 26 , name: "Dumai" },
          { province_id: 26 , name: "Pekanbaru" },
          { province_id: 27 , name: "Makassar" },
          { province_id: 27 , name: "Palopo" },
          { province_id: 27 , name: "Parepare" },
          { province_id: 28 , name: "Palu" },
          { province_id: 29 , name: "Baubau" },
          { province_id: 29 , name: "Kendari" },
          { province_id: 30 , name: "Bitung" },
          { province_id: 30 , name: "Kotamobagu" },
          { province_id: 30 , name: "Manado" },
          { province_id: 30 , name: "Tomohon" },
          { province_id: 31 , name: "Bukittinggi" },
          { province_id: 31 , name: "Padang" },
          { province_id: 31 , name: "Padang Panjang" },
          { province_id: 31 , name: "Pariaman" },
          { province_id: 31 , name: "Payakumbuh" },
          { province_id: 31 , name: "Sawahlunto" },
          { province_id: 31 , name: "Solok" },
          { province_id: 32 , name: "Lubuklinggau" },
          { province_id: 32 , name: "Pagar Alam" },
          { province_id: 32 , name: "Palembang" },
          { province_id: 32 , name: "Prabumulih" },
          { province_id: 33 , name: "Binjai" },
          { province_id: 33 , name: "Gunungsitoli" },
          { province_id: 33 , name: "Medan" },
          { province_id: 33 , name: "Padangsidimpuan" },
          { province_id: 33 , name: "Pematangsiantar" },
          { province_id: 33 , name: "Sibolga" },
          { province_id: 33 , name: "Tanjungbalai" },
          { province_id: 33 , name: "Tebing Tinggi" },
          { province_id: 34 , name: "Sorong" },
          { province_id: 34 , name: "Manokwari" },
          { province_id: 34 , name: "Fakfak" },
          { province_id: 34 , name: "Sorong Selatan" },
          { province_id: 34 , name: "Raja Ampat" },
          { province_id: 34 , name: "Teluk Bintuni" },
          { province_id: 34 , name: "Teluk Wondama" },
          { province_id: 34 , name: "Kaimana" },
          { province_id: 34 , name: "Tambrauw" },
          { province_id: 34 , name: "Maybrat" },
          { province_id: 34 , name: "Manokwari Selatan" },
          { province_id: 34 , name: "Pegunungan Arfak" },
          { province_id: 34 , name: "Kota Sorong" },
          { province_id: 35 , name: "Deiyai" },
          { province_id: 35 , name: "Dogiyai" },
          { province_id: 35 , name: "Intan Jaya" },
          { province_id: 35 , name: "Mimika" },
          { province_id: 35 , name: "Nabire" },
          { province_id: 35 , name: "Paniai" },
          { province_id: 35 , name: "Puncak" },
          { province_id: 35 , name: "Puncak Jaya" },
          { province_id: 36 , name: "Jayawijaya" },
          { province_id: 36 , name: "Lanny Jaya" },
          { province_id: 36 , name: "Mamberamo Tengah" },
          { province_id: 36 , name: "Nduga" },
          { province_id: 36 , name: "Pegunungan Bintang" },
          { province_id: 36 , name: "Tolikara" },
          { province_id: 36 , name: "Yalimo" },
          { province_id: 36 , name: "Yahukimo" },
          { province_id: 37 , name: "Asmat" },
          { province_id: 37 , name: "Boven Digoel" },
          { province_id: 37 , name: "Mappi" },
          { province_id: 37 , name: "Merauke" },
          { province_id: 38 , name: "Majene" },
          { province_id: 38 , name: "Mamasa" },
          { province_id: 38 , name: "Mamuju" },
          { province_id: 38 , name: "Mamuju Tengah" },
          { province_id: 38 , name: "Pasangkayu" },
          { province_id: 38 , name: "Polewali Mandar" },

      ]

      var id = 1;

      for (const city of cities) {

          await prisma.city.upsert({
            where: { id: id },
            update: {},
            create: {
              id: id,
              province_id: city.province_id,
              name: city.name,
            },
          });
          id++
        }
  }

  

  const upsertProvinces = async () => {
      var id:number = 1;
      const provinces = [
          { country_id: 1, name: 'Aceh' },
          { country_id: 1, name: 'Bali' },
          { country_id: 1, name: 'Bangka_Belitung' },
          { country_id: 1, name: 'Banten' },
          { country_id: 1, name: 'Bengkulu' },
          { country_id: 1, name: 'Daerah_Istimewa_Yogyakarta' },
          { country_id: 1, name: 'Gorontalo' },
          { country_id: 1, name: 'Jakarta' },
          { country_id: 1, name: 'Jambi' },
          { country_id: 1, name: 'Jawa_Barat' },
          { country_id: 1, name: 'Jawa_Tengah' },
          { country_id: 1, name: 'Jawa_Timur' },
          { country_id: 1, name: 'Kalimantan_Barat' },
          { country_id: 1, name: 'Kalimantan_Selatan' },
          { country_id: 1, name: 'Kalimantan_Tengah' },
          { country_id: 1, name: 'Kalimantan_Timur' },
          { country_id: 1, name: 'Kalimantan_Utara' },
          { country_id: 1, name: 'Kepulauan_Riau' },
          { country_id: 1, name: 'Lampung' },
          { country_id: 1, name: 'Maluku_Utara' },
          { country_id: 1, name: 'Maluku' },
          { country_id: 1, name: 'Nusa_Tenggara_Barat' },
          { country_id: 1, name: 'Nusa_Tenggara_Timur' },
          { country_id: 1, name: 'Papua_Barat_Daya' },
          { country_id: 1, name: 'Papua' },
          { country_id: 1, name: 'Riau' },
          { country_id: 1, name: 'Sulawesi_Selatan' },
          { country_id: 1, name: 'Sulawesi_Tengah' },
          { country_id: 1, name: 'Sulawesi_Tenggara' },
          { country_id: 1, name: 'Sulawesi_Utara'  },
          { country_id: 1, name: 'Sumatera_Barat' },
          { country_id: 1, name: 'Sumatera_Selatan'  },
          { country_id: 1, name: 'Sumatera_Utara' },
          { country_id: 1, name: 'Papua_Barat' },
          { country_id: 1, name: 'Papua_Tengah' },
          { country_id: 1, name: 'Papua_Pegunungan' },
          { country_id: 1, name: 'Papua_Selatan' },
          { country_id: 1, name: 'Sulawesi_Barat' },
      ];
    
      for (const province of provinces) {
        await prisma.province.upsert({
          where: { id: id },
          update: {
            name: province.name
          },
          create: {
            id: id,
            country_id: province.country_id,
            name: province.name,
          },
        });
        id++
      }
    };
    
    const user1 = await prisma.user.upsert({
      where: {id: 1},
      update: {},
      create: {
          id: 1,
          company: "Bina Nusantara",
          first_name: "Christopher",
          last_name: "Limawan",
          email: "christopher@gmail.com",
          password: "test",
          dob: new Date('1999-01-05')
      }
    })

    const user2 = await prisma.user.upsert({
      where: {id: 2},
      update: {},
      create: {
          id: 2,
          company: "Bina Nusantara",
          first_name: "Jevon",
          last_name: "Danaristo",
          email: "jevon@gmail.com",
          password: "test",
          dob: new Date('2000-01-05')
      }
    })

    await upsertProvinces();
    await upsertCities();
    // await seedAnswers(); 
}

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

main()
.catch((e) => {
  console.error(e);
  process.exit(1);
})
.finally(async () => {
  // close Prisma Client at the end
  await prisma.$disconnect();
});