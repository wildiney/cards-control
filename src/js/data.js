// Sticker album data — FIFA World Cup 2026 (Panini)
// Player names sourced from checklistinsider.com

function p(name) {
  return { name };
}

function makeStickers(code, players) {
  const s = [];
  s.push({ id: `${code}-1`, type: 'badge', label: 'Escudo', foil: true });
  players.slice(0, 11).forEach((pl, i) => {
    s.push({ id: `${code}-${i + 2}`, type: 'player', name: pl.name, number: pl.number || null });
  });
  s.push({ id: `${code}-13`, type: 'team', label: 'Equipe' });
  players.slice(11, 18).forEach((pl, i) => {
    s.push({ id: `${code}-${i + 14}`, type: 'player', name: pl.name, number: pl.number || null });
  });
  return s;
}

export const FWC_SECTION = {
  code: 'FWC',
  name: 'FIFA World Cup 2026',
  flag: '🏆',
  group: null,
  colors: { primary: '#1a1a2e', secondary: '#C9A227', accent: '#FFFFFF' },
  stickers: [
    { id: 'FWC-1',  type: 'intro',  label: 'Emblema Oficial',                foil: true },
    { id: 'FWC-2',  type: 'intro',  label: 'Emblema Oficial',                foil: true },
    { id: 'FWC-3',  type: 'intro',  label: 'Mascotes Oficiais',              foil: true },
    { id: 'FWC-4',  type: 'intro',  label: 'Slogan Oficial',                 foil: true },
    { id: 'FWC-5',  type: 'intro',  label: 'Bola Oficial',                   foil: true },
    { id: 'FWC-6',  type: 'intro',  label: 'Sedes — Canadá',                 foil: true },
    { id: 'FWC-7',  type: 'intro',  label: 'Sedes — México',                 foil: true },
    { id: 'FWC-8',  type: 'intro',  label: 'Sedes — Estados Unidos',         foil: true },
    { id: 'FWC-9',  type: 'intro',  label: 'Troféu FIFA',                    foil: true },
    { id: 'FWC-10', type: 'museum', label: 'Itália 1934 — Museu FIFA',       foil: true },
    { id: 'FWC-11', type: 'museum', label: 'Uruguai 1950 — Museu FIFA',      foil: true },
    { id: 'FWC-12', type: 'museum', label: 'Alemanha Ocid. 1954 — Museu FIFA', foil: true },
    { id: 'FWC-13', type: 'museum', label: 'Brasil 1962 — Museu FIFA',       foil: true },
    { id: 'FWC-14', type: 'museum', label: 'Alemanha Ocid. 1974 — Museu FIFA', foil: true },
    { id: 'FWC-15', type: 'museum', label: 'Argentina 1986 — Museu FIFA',    foil: true },
    { id: 'FWC-16', type: 'museum', label: 'Brasil 1994 — Museu FIFA',       foil: true },
    { id: 'FWC-17', type: 'museum', label: 'Brasil 2002 — Museu FIFA',       foil: true },
    { id: 'FWC-18', type: 'museum', label: 'Alemanha 2014 — Museu FIFA',     foil: true },
    { id: 'FWC-19', type: 'museum', label: 'Argentina 2022 — Museu FIFA',    foil: true },
    { id: 'FWC-20', type: 'museum', label: 'Itália 2006 — Museu FIFA',       foil: true },
  ],
};

export const COUNTRIES = [
  // ── GROUP A ─────────────────────────────────────────────────
  {
    code: 'MEX', name: 'México', flag: '🇲🇽', group: 'A',
    colors: { primary: '#006847', secondary: '#FFFFFF', accent: '#CE1126' },
    stickers: makeStickers('MEX', [
      p('Luis Malagón'), p('Johan Vásquez'), p('Jorge Sánchez'),
      p('César Montes'), p('Jesús Gallardo'), p('Israel Reyes'),
      p('Diego Lainez'), p('Carlos Rodríguez'), p('Edson Álvarez'),
      p('Orbelín Pineda'), p('Marcel Ruíz'),
      p('Érick Sánchez'), p('Hirving Lozano'), p('Santiago Giménez'),
      p('Raúl Jiménez'), p('Alexis Vega'), p('Roberto Alvarado'), p('César Huerta'),
    ]),
  },
  {
    code: 'RSA', name: 'África do Sul', flag: '🇿🇦', group: 'A',
    colors: { primary: '#007A4D', secondary: '#FFB612', accent: '#000000' },
    stickers: makeStickers('RSA', [
      p('Ronwen Williams'), p('Sipho Chaine'), p('Aubrey Modiba'),
      p('Samukele Kabini'), p('Mbekezeli Mbokazi'), p('Khulumani Ndamane'),
      p('Siyabonga Ngezana'), p('Khuliso Mudau'), p('Nkosinathi Sibisi'),
      p('Teboho Mokoena'), p('Thalente Mbatha'),
      p('Bathasi Aubaas'), p('Yaya Sithole'), p('Sipho Mbule'),
      p('Lyle Foster'), p('Iqraam Rayners'), p('Mohau Nkota'), p('Oswin Appollis'),
    ]),
  },
  {
    code: 'KOR', name: 'Coreia do Sul', flag: '🇰🇷', group: 'A',
    colors: { primary: '#C60C30', secondary: '#FFFFFF', accent: '#003478' },
    stickers: makeStickers('KOR', [
      p('Hyeon-woo Jo'), p('Seung-gyu Kim'), p('Min-jae Kim'),
      p('Yu-min Cho'), p('Young-woo Seol'), p('Han-beom Lee'),
      p('Tae-seok Lee'), p('Myung-jae Lee'), p('Jae-sung Lee'),
      p('In-beom Hwang'), p('Kang-in Lee'),
      p('Seung-ho Paik'), p('Jens Castrop'), p('Dong-yeong Lee'),
      p('Gue-sung Cho'), p('Heung-min Son'), p('Hee-chan Hwang'), p('Hyeon-gyu Oh'),
    ]),
  },
  {
    code: 'CZE', name: 'República Tcheca', flag: '🇨🇿', group: 'A',
    colors: { primary: '#D7141A', secondary: '#FFFFFF', accent: '#11457E' },
    stickers: makeStickers('CZE', [
      p('Matěj Kovář'), p('Jindřich Staněk'), p('Ladislav Krejčí'),
      p('Vladimír Coufal'), p('Jaroslav Zelený'), p('Tomáš Holeš'),
      p('David Zima'), p('Michal Sádilek'), p('Lukáš Provod'),
      p('Lukáš Červ'), p('Tomáš Souček'),
      p('Pavel Šulc'), p('Matěj Vydra'), p('Vasil Kušej'),
      p('Tomáš Chorý'), p('Václav Černý'), p('Adam Hložek'), p('Patrik Schick'),
    ]),
  },

  // ── GROUP B ─────────────────────────────────────────────────
  {
    code: 'CAN', name: 'Canadá', flag: '🇨🇦', group: 'B',
    colors: { primary: '#FF0000', secondary: '#FFFFFF', accent: '#000000' },
    stickers: makeStickers('CAN', [
      p('Dayne St. Clair'), p('Alphonso Davies'), p('Alistair Johnston'),
      p('Samuel Adekugbe'), p('Richie Laryea'), p('Derek Cornelius'),
      p('Moïse Bombito'), p('Kamal Miller'), p('Stephen Eustáquio'),
      p('Ismaël Koné'), p('Jonathan Osorio'),
      p('Jacob Shaffelburg'), p('Mathieu Choinière'), p('Niko Sigur'),
      p('Tajon Buchanan'), p('Liam Millar'), p('Cyle Larin'), p('Jonathan David'),
    ]),
  },
  {
    code: 'BIH', name: 'Bósnia e Herzegovina', flag: '🇧🇦', group: 'B',
    colors: { primary: '#002395', secondary: '#FCDD09', accent: '#FFFFFF' },
    stickers: makeStickers('BIH', [
      p('Nikola Vasilj'), p('Amer Dedić'), p('Sead Kolašinac'),
      p('Tarik Muharemović'), p('Nihad Mujakić'), p('Edin Džeko'),
      p('Miralem Pjanić'), p('Ermin Bičakčić'), p('Haris Duljevic'),
      p('Luka Menalo'), p('Hadžiahmetović Nermin'),
      p('Adnan Kovačević'), p('Anel Ahmedhodžić'), p('Armin Hodžić'),
      p('Almedin Ziljkić'), p('Damir Džidić'), p('Kenan Kodro'), p('Amar Rašidagić'),
    ]),
  },
  {
    code: 'QAT', name: 'Qatar', flag: '🇶🇦', group: 'B',
    colors: { primary: '#8D1B3D', secondary: '#FFFFFF', accent: '#8D1B3D' },
    stickers: makeStickers('QAT', [
      p('Meshaal Barsham'), p('Sultan Albrake'), p('Lucas Mendes'),
      p('Homam Ahmed'), p('Boualem Khoukhi'), p('Pedro Miguel'),
      p('Tarek Salman'), p('Mohamed Al-Mannai'), p('Karim Boudiaf'),
      p('Assim Madibo'), p('Ahmed Fatehi'),
      p('Mohammed Waad'), p('Abdulaziz Hatem'), p('Hassan Al-Haydos'),
      p('Edmilson Junior'), p('Akram Hassan Afif'), p('Ahmed Al Ganehi'), p('Almoez Ali'),
    ]),
  },
  {
    code: 'SUI', name: 'Suíça', flag: '🇨🇭', group: 'B',
    colors: { primary: '#FF0000', secondary: '#FFFFFF', accent: '#FF0000' },
    stickers: makeStickers('SUI', [
      p('Gregor Kobel'), p('Yvon Mvogo'), p('Manuel Akanji'),
      p('Ricardo Rodríguez'), p('Nico Elvedi'), p('Aurèle Amenda'),
      p('Silvan Widmer'), p('Denis Zakaria'), p('Granit Xhaka'),
      p('Remo Freuler'), p('Fabian Rieder'),
      p('Ardon Jashari'), p('Johan Manzambi'), p('Michel Aebischer'),
      p('Breel Embolo'), p('Ruben Vargas'), p('Dan Ndoye'), p('Zeki Amdouni'),
    ]),
  },

  // ── GROUP C ─────────────────────────────────────────────────
  {
    code: 'BRA', name: 'Brasil', flag: '🇧🇷', group: 'C',
    colors: { primary: '#009C3B', secondary: '#FFDF00', accent: '#002776' },
    stickers: makeStickers('BRA', [
      p('Alisson'), p('Bento'), p('Marquinhos'),
      p('Éder Militão'), p('Gabriel Magalhães'), p('Danilo'),
      p('Wesley'), p('Lucas Paquetá'), p('Casemiro'),
      p('Bruno Guimarães'), p('Luiz Henrique'),
      p('Vinícius Júnior'), p('Rodrygo'), p('João Pedro'),
      p('Matheus Cunha'), p('Gabriel Martinelli'), p('Raphinha'), p('Estêvão'),
    ]),
  },
  {
    code: 'SCO', name: 'Escócia', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', group: 'C',
    colors: { primary: '#003380', secondary: '#FFFFFF', accent: '#003380' },
    stickers: makeStickers('SCO', [
      p('Angus Gunn'), p('Jack Hendry'), p('Kieran Tierney'),
      p('Aaron Hickey'), p('Andrew Robertson'), p('Scott McKenna'),
      p('John Souttar'), p('Anthony Ralston'), p('Grant Hanley'),
      p('Scott McTominay'), p('Billy Gilmour'),
      p('Lewis Ferguson'), p('Ryan Christie'), p('Kenny McLean'),
      p('John McGinn'), p('Lyndon Dykes'), p('Che Adams'), p('Ben Doak'),
    ]),
  },
  {
    code: 'MAR', name: 'Marrocos', flag: '🇲🇦', group: 'C',
    colors: { primary: '#C1121C', secondary: '#006233', accent: '#FFFFFF' },
    stickers: makeStickers('MAR', [
      p('Yassine Bounou'), p('Munir El Kajoui'), p('Achraf Hakimi'),
      p('Noussair Mazraoui'), p('Nayef Aguerd'), p('Romain Saïss'),
      p('Jawad El Yamiq'), p('Adam Masina'), p('Sofyan Amrabat'),
      p('Azzedine Ounahi'), p('Eliesse Ben Seghir'),
      p('Bilal El Khannouss'), p('Ismaël Saibari'), p('Youssef En-Nesyri'),
      p('Abde Ezzalzouli'), p('Soufiane Rahimi'), p('Brahim Díaz'), p('Ayoub El Kaabi'),
    ]),
  },
  {
    code: 'HAI', name: 'Haiti', flag: '🇭🇹', group: 'C',
    colors: { primary: '#003087', secondary: '#D21034', accent: '#FFFFFF' },
    stickers: makeStickers('HAI', [
      p('Johny Placide'), p('Carlens Arcus'), p('Martin Expérience'),
      p('Jean-Kevin Duverne'), p('Ricardo Adé'), p('Duke Lacroix'),
      p('Garven Metusala'), p('Hannes Delcroix'), p('Leverton Pierre'),
      p('Danley Jean Jacques'), p('Jean-Ricner Bellegarde'),
      p('Christopher Attys'), p('Derrick Etienne Jr.'), p('Josue Casimir'),
      p('Ruben Providence'), p('Duckens Nazon'), p('Louicius Deedson'), p('Frantzdy Pierrot'),
    ]),
  },

  // ── GROUP D ─────────────────────────────────────────────────
  {
    code: 'USA', name: 'Estados Unidos', flag: '🇺🇸', group: 'D',
    colors: { primary: '#002868', secondary: '#BF0A30', accent: '#FFFFFF' },
    stickers: makeStickers('USA', [
      p('Matt Freese'), p('Chris Richards'), p('Tim Ream'),
      p('Mark McKenzie'), p('Alex Freeman'), p('Antonee Robinson'),
      p('Tyler Adams'), p('Tanner Tessmann'), p('Weston McKennie'),
      p('Christian Roldan'), p('Timothy Weah'),
      p('Diego Luna'), p('Malik Tillman'), p('Christian Pulisic'),
      p('Brenden Aaronson'), p('Ricardo Pepi'), p('Haji Wright'), p('Folarin Balogun'),
    ]),
  },
  {
    code: 'AUS', name: 'Austrália', flag: '🇦🇺', group: 'D',
    colors: { primary: '#FFD700', secondary: '#00843D', accent: '#003087' },
    stickers: makeStickers('AUS', [
      p('Mathew Ryan'), p('Joe Gauci'), p('Harry Souttar'),
      p('Alessandro Circati'), p('Jordan Bos'), p('Aziz Behich'),
      p('Cameron Burgess'), p('Lewis Miller'), p('Miloš Degenek'),
      p('Jackson Irvine'), p('Riley McGree'),
      p('Aiden O\'Neill'), p('Connor Metcalfe'), p('Patrick Yazbek'),
      p('Craig Goodwin'), p('Kusini Yengi'), p('Nestory Irankunda'), p('Mohamed Touré'),
    ]),
  },
  {
    code: 'PAR', name: 'Paraguai', flag: '🇵🇾', group: 'D',
    colors: { primary: '#0038A8', secondary: '#FFFFFF', accent: '#D52B1E' },
    stickers: makeStickers('PAR', [
      p('Roberto Fernández'), p('Orlando Gill'), p('Gustavo Gómez'),
      p('Fabián Balbuena'), p('Juan José Cáceres'), p('Omar Alderete'),
      p('Junior Alonso'), p('Mathías Villasanti'), p('Diego Gómez'),
      p('Damián Bobadilla'), p('Andrés Cubas'),
      p('Matías Galarza Fonda'), p('Julio Enciso'), p('Alejandro Romero Gamarra'),
      p('Miguel Almirón'), p('Ramón Sosa'), p('Ángel Romero'), p('Antonio Sanabria'),
    ]),
  },
  {
    code: 'TUR', name: 'Turquia', flag: '🇹🇷', group: 'D',
    colors: { primary: '#E30A17', secondary: '#FFFFFF', accent: '#E30A17' },
    stickers: makeStickers('TUR', [
      p('Uğurcan Çakır'), p('Mert Müldür'), p('Zeki Çelik'),
      p('Abdülkerim Bardakcı'), p('Çağlar Söyüncü'), p('Merih Demiral'),
      p('Ferdi Kadıoğlu'), p('Kaan Ayhan'), p('İsmail Yüksek'),
      p('Hakan Çalhanoğlu'), p('Orkun Kökçü'),
      p('Arda Güler'), p('İrfan Can Kahveci'), p('Yunus Akgün'),
      p('Can Uzun'), p('Barış Alper Yılmaz'), p('Kerem Aktürkoğlu'), p('Kenan Yıldız'),
    ]),
  },

  // ── GROUP E ─────────────────────────────────────────────────
  {
    code: 'GER', name: 'Alemanha', flag: '🇩🇪', group: 'E',
    colors: { primary: '#000000', secondary: '#DD0000', accent: '#FFCE00' },
    stickers: makeStickers('GER', [
      p('Marc-André ter Stegen'), p('Jonathan Tah'), p('David Raum'),
      p('Nico Schlotterbeck'), p('Antonio Rüdiger'), p('Waldemar Anton'),
      p('Ridle Baku'), p('Maximilian Mittelstädt'), p('Joshua Kimmich'),
      p('Florian Wirtz'), p('Felix Nmecha'),
      p('Leon Goretzka'), p('Jamal Musiala'), p('Serge Gnabry'),
      p('Kai Havertz'), p('Leroy Sané'), p('Karim Adeyemi'), p('Nick Woltemade'),
    ]),
  },
  {
    code: 'CUW', name: 'Curaçao', flag: '🇨🇼', group: 'E',
    colors: { primary: '#003DA5', secondary: '#F7D116', accent: '#FFFFFF' },
    stickers: makeStickers('CUW', [
      p('Eloy Room'), p('Armando Obispo'), p('Sherel Floranus'),
      p('Juriën Gaari'), p('Joshua Brenet'), p('Roshon van Eijma'),
      p('Shurandy Sambo'), p('Livano Comenencia'), p('Godfried Roemeratoe'),
      p('Juninho Bacuna'), p('Leandro Bacuna'),
      p('Tahith Chong'), p('Kenji Gorré'), p('Jearl Margaritha'),
      p('Jürgen Locadia'), p('Jeremy Antonisse'), p('Gervane Kastaneer'), p('Sontje Hansen'),
    ]),
  },
  {
    code: 'CIV', name: 'Costa do Marfim', flag: '🇨🇮', group: 'E',
    colors: { primary: '#F77F00', secondary: '#009A44', accent: '#FFFFFF' },
    stickers: makeStickers('CIV', [
      p('Yahia Fofana'), p('Ghislain Konan'), p('Wilfried Singo'),
      p('Odilon Kossounou'), p('Evan Ndicka'), p('Willy Boly'),
      p('Emmanuel Agbadou'), p('Ousmane Diomandé'), p('Franck Kessié'),
      p('Seko Fofana'), p('Ibrahim Sangaré'),
      p('Jean-Philippe Gbamin'), p('Amad Diallo'), p('Sébastien Haller'),
      p('Simon Adingra'), p('Yan Diomandé'), p('Evann Guessand'), p('Oumar Diakité'),
    ]),
  },
  {
    code: 'ECU', name: 'Equador', flag: '🇪🇨', group: 'E',
    colors: { primary: '#FFD100', secondary: '#003DA5', accent: '#EE1C25' },
    stickers: makeStickers('ECU', [
      p('Hernán Galíndez'), p('Gonzalo Valle'), p('Piero Hincapié'),
      p('Pervis Estupiñán'), p('Willian Pacho'), p('Ángelo Preciado'),
      p('Joel Ordóñez'), p('Moisés Caicedo'), p('Alan Franco'),
      p('Kendry Páez'), p('Pedro Vite'),
      p('John Yeboah'), p('Leonardo Campana'), p('Gonzalo Plata'),
      p('Nilson Angulo'), p('Alan Minda'), p('Kevin Rodríguez'), p('Enner Valencia'),
    ]),
  },

  // ── GROUP F ─────────────────────────────────────────────────
  {
    code: 'NED', name: 'Países Baixos', flag: '🇳🇱', group: 'F',
    colors: { primary: '#FF4F00', secondary: '#FFFFFF', accent: '#002B7F' },
    stickers: makeStickers('NED', [
      p('Bart Verbruggen'), p('Virgil van Dijk'), p('Micky van de Ven'),
      p('Jurriën Timber'), p('Denzel Dumfries'), p('Nathan Aké'),
      p('Jeremie Frimpong'), p('Jan Paul van Hecke'), p('Tijjani Reijnders'),
      p('Ryan Gravenberch'), p('Teun Koopmeiners'),
      p('Frenkie de Jong'), p('Xavi Simons'), p('Justin Kluivert'),
      p('Memphis Depay'), p('Donyell Malen'), p('Wout Weghorst'), p('Cody Gakpo'),
    ]),
  },
  {
    code: 'JPN', name: 'Japão', flag: '🇯🇵', group: 'F',
    colors: { primary: '#BC002D', secondary: '#FFFFFF', accent: '#BC002D' },
    stickers: makeStickers('JPN', [
      p('Zion Suzuki'), p('Henry Heroki Mochizuki'), p('Ayumu Seko'),
      p('Junnosuke Suzuki'), p('Shogo Taniguchi'), p('Tsuyoshi Watanabe'),
      p('Kaishu Sano'), p('Yuki Soma'), p('Ao Tanaka'),
      p('Daichi Kamada'), p('Takefusa Kubo'),
      p('Ritsu Doan'), p('Keito Nakamura'), p('Takumi Minamino'),
      p('Shuto Machino'), p('Junya Ito'), p('Kōki Ogawa'), p('Ayase Ueda'),
    ]),
  },
  {
    code: 'SWE', name: 'Suécia', flag: '🇸🇪', group: 'F',
    colors: { primary: '#006AA7', secondary: '#FECC02', accent: '#006AA7' },
    stickers: makeStickers('SWE', [
      p('Victor Johansson'), p('Isak Hien'), p('Gabriel Gudmundsson'),
      p('Emil Holm'), p('Victor Nilsson Lindelöf'), p('Gustaf Lagerbielke'),
      p('Lucas Bergvall'), p('Hugo Larsson'), p('Jesper Karlström'),
      p('Yasin Ayari'), p('Mattias Svanberg'),
      p('Daniel Svensson'), p('Ken Sema'), p('Roony Bardghji'),
      p('Dejan Kulusevski'), p('Anthony Elanga'), p('Alexander Isak'), p('Viktor Gyökeres'),
    ]),
  },
  {
    code: 'TUN', name: 'Tunísia', flag: '🇹🇳', group: 'F',
    colors: { primary: '#E70013', secondary: '#FFFFFF', accent: '#E70013' },
    stickers: makeStickers('TUN', [
      p('Bechir Ben Said'), p('Aymen Dahmen'), p('Yan Valéry'),
      p('Montassar Talbi'), p('Yassine Meriah'), p('Ali Abdi'),
      p('Dylan Bronn'), p('Ellyes Skhiri'), p('Aïssa Laïdouni'),
      p('Ferjani Sassi'), p('Mohamed Ali Ben Romdhane'),
      p('Hannibal Mejbri'), p('Elias Achouri'), p('Elias Saad'),
      p('Hazem Mastouri'), p('İsmael Gharbi'), p('Sayfallah Ltaief'), p('Naïm Sliti'),
    ]),
  },

  // ── GROUP G ─────────────────────────────────────────────────
  {
    code: 'BEL', name: 'Bélgica', flag: '🇧🇪', group: 'G',
    colors: { primary: '#000000', secondary: '#EF3340', accent: '#FDDA24' },
    stickers: makeStickers('BEL', [
      p('Thibaut Courtois'), p('Arthur Théate'), p('Timothy Castagne'),
      p('Zeno Debast'), p('Brandon Mechele'), p('Maxim De Cuyper'),
      p('Thomas Meunier'), p('Youri Tielemans'), p('Amadou Onana'),
      p('Nicolas Raskin'), p('Alexis Saelemaekers'),
      p('Hans Vanaken'), p('Kevin De Bruyne'), p('Jérémy Doku'),
      p('Charles De Ketelaere'), p('Leandro Trossard'), p('Loïs Openda'), p('Romelu Lukaku'),
    ]),
  },
  {
    code: 'EGY', name: 'Egito', flag: '🇪🇬', group: 'G',
    colors: { primary: '#CE1126', secondary: '#FFFFFF', accent: '#000000' },
    stickers: makeStickers('EGY', [
      p('Mohamed El-Shenawy'), p('Mohamed Hany'), p('Mohamed Hamdy'),
      p('Yasser Ibrahim'), p('Khaled Sobhi'), p('Ramy Rabia'),
      p('Hossam Abdelmaguid'), p('Ahmed Fatouh'), p('Marwan Attia'),
      p('Zizo'), p('Hamdy Fathy'),
      p('Mohamed Lasheen'), p('Emam Ashour'), p('Osama Faisal'),
      p('Mohamed Salah'), p('Mostafa Mohamed'), p('Trezeguet'), p('Omar Marmoush'),
    ]),
  },
  {
    code: 'IRN', name: 'Irã', flag: '🇮🇷', group: 'G',
    colors: { primary: '#239F40', secondary: '#FFFFFF', accent: '#DA0000' },
    stickers: makeStickers('IRN', [
      p('Alireza Beiranvand'), p('Morteza Pouraliganji'), p('Ehsan Hajsafi'),
      p('Milad Mohammadi'), p('Shojae Khalilzadeh'), p('Ramin Rezaeian'),
      p('Hossein Kanaani'), p('Sadegh Moharrami'), p('Saleh Hardani'),
      p('Saeid Ezatolahi'), p('Saman Ghoddos'),
      p('Omid Noorafkan'), p('Roozbeh Cheshmi'), p('Mohammad Mohebi'),
      p('Sardar Azmoun'), p('Mehdi Taremi'), p('Alireza Jahanbakhsh'), p('Ali Gholizadeh'),
    ]),
  },
  {
    code: 'NZL', name: 'Nova Zelândia', flag: '🇳🇿', group: 'G',
    colors: { primary: '#FFFFFF', secondary: '#000000', accent: '#C60C30' },
    stickers: makeStickers('NZL', [
      p('Max Crocombe Payne'), p('Alex Paulsen'), p('Michael Boxall'),
      p('Liberato Cacace'), p('Tim Payne'), p('Tyler Bindon'),
      p('Francis de Vries'), p('Finn Surman'), p('Joe Bell'),
      p('Sarpreet Singh'), p('Ryan Thomas'),
      p('Matthew Garbett'), p('Marko Stamenić'), p('Ben Old'),
      p('Chris Wood'), p('Elijah Just'), p('Callum McCowatt'), p('Kosta Barbarouses'),
    ]),
  },

  // ── GROUP H ─────────────────────────────────────────────────
  {
    code: 'ESP', name: 'Espanha', flag: '🇪🇸', group: 'H',
    colors: { primary: '#AA151B', secondary: '#F1BF00', accent: '#AA151B' },
    stickers: makeStickers('ESP', [
      p('Unai Simón'), p('Robin Le Normand'), p('Aymeric Laporte'),
      p('Dean Huijsen'), p('Pedro Porro'), p('Dani Carvajal'),
      p('Marc Cucurella'), p('Martín Zubimendi'), p('Rodri'),
      p('Pedri'), p('Fabián Ruiz'),
      p('Mikel Merino'), p('Lamine Yamal'), p('Dani Olmo'),
      p('Nico Williams'), p('Ferran Torres'), p('Álvaro Morata'), p('Mikel Oyarzabal'),
    ]),
  },
  {
    code: 'CPV', name: 'Cabo Verde', flag: '🇨🇻', group: 'H',
    colors: { primary: '#003893', secondary: '#CF2027', accent: '#F7D116' },
    stickers: makeStickers('CPV', [
      p('Vozinha'), p('Logan Costa'), p('Pico'),
      p('Diney'), p('Steven Moreira'), p('Wagner Pina'),
      p('João Paulo'), p('Yannick Semedo'), p('Kevin Pina'),
      p('Patrick Andrade'), p('Jamiro Monteiro'),
      p('Deroy Duarte'), p('Garry Rodrigues'), p('Jovane Cabral'),
      p('Ryan Mendes'), p('Dailon Livramento'), p('Willy Semedo'), p('Bebé'),
    ]),
  },
  {
    code: 'KSA', name: 'Arábia Saudita', flag: '🇸🇦', group: 'H',
    colors: { primary: '#006C35', secondary: '#FFFFFF', accent: '#006C35' },
    stickers: makeStickers('KSA', [
      p('Nawaf Alaqidi'), p('Abdulrahman Al-Sanbi'), p('Saud Abdulhamid'),
      p('Nawaf Bouwashl'), p('Jihad Thakri'), p('Moteb Al-Harbi'),
      p('Hassan Altambakti'), p('Musab Aljuwayr'), p('Ziyad Aljohani'),
      p('Abdullah Alkhaibari'), p('Nasser Aldawsari'),
      p('Saleh Abu Alshamat'), p('Marwan Alsahafi'), p('Salem Aldawsari'),
      p('Abdulrahman Al-Aboud'), p('Feras Alkbrikan'), p('Saleh Alshehri'), p('Abdullah Al-Hamdan'),
    ]),
  },
  {
    code: 'URU', name: 'Uruguai', flag: '🇺🇾', group: 'H',
    colors: { primary: '#5EB6E4', secondary: '#FFFFFF', accent: '#000000' },
    stickers: makeStickers('URU', [
      p('Sergio Rochet'), p('Santiago Mele'), p('Ronald Araújo'),
      p('José María Giménez'), p('Sebastián Cáceres'), p('Mathías Olivera'),
      p('Guillermo Varela'), p('Nahitán Nández'), p('Federico Valverde'),
      p('Giorgian De Arrascaeta'), p('Rodrigo Bentancur'),
      p('Manuel Ugarte'), p('Nicolás De La Cruz'), p('Maxi Araújo'),
      p('Darwin Núñez'), p('Federico Viñas'), p('Rodrigo Aguirre'), p('Facundo Pellistri'),
    ]),
  },

  // ── GROUP I ─────────────────────────────────────────────────
  {
    code: 'FRA', name: 'França', flag: '🇫🇷', group: 'I',
    colors: { primary: '#002395', secondary: '#FFFFFF', accent: '#ED2939' },
    stickers: makeStickers('FRA', [
      p('Mike Maignan'), p('Theo Hernández'), p('William Saliba'),
      p('Jules Koundé'), p('Ibrahima Konaté'), p('Dayot Upamecano'),
      p('Lucas Digne'), p('Aurélien Tchouaméni'), p('Eduardo Camavinga'),
      p('Manu Koné'), p('Adrien Rabiot'),
      p('Michaël Olise'), p('Ousmane Dembélé'), p('Bradley Barcola'),
      p('Désiré Doué'), p('Kingsley Coman'), p('Hugo Ekitike'), p('Kylian Mbappé'),
    ]),
  },
  {
    code: 'SEN', name: 'Senegal', flag: '🇸🇳', group: 'I',
    colors: { primary: '#00853F', secondary: '#FDEF42', accent: '#E31B23' },
    stickers: makeStickers('SEN', [
      p('Édouard Mendy'), p('Yehvann Diouf'), p('Moussa Niakhaté'),
      p('Abdoulaye Seck'), p('Ismail Jakobs'), p('El Hadji Malick Diouf'),
      p('Kalidou Koulibaly'), p('Idrissa Gana Guèye'), p('Pape Matar Sarr'),
      p('Pape Guèye'), p('Habib Diarra'),
      p('Lamine Camara'), p('Sadio Mané'), p('Ismaïla Sarr'),
      p('Boulaye Dia'), p('Iliman Ndiaye'), p('Nicolas Jackson'), p('Krepin Diatta'),
    ]),
  },
  {
    code: 'IRQ', name: 'Iraque', flag: '🇮🇶', group: 'I',
    colors: { primary: '#CE1126', secondary: '#FFFFFF', accent: '#000000' },
    stickers: makeStickers('IRQ', [
      p('Jalal Hassan'), p('Rebin Sulaka'), p('Hussein Ali'),
      p('Akam Hashem'), p('Merchas Doski'), p('Zaid Tahseen'),
      p('Manaf Younis'), p('Zidane Iqbal'), p('Amir Al-Ammari'),
      p('Ibrahim Bavesh'), p('Ali Jasim'),
      p('Youssef Amyn'), p('Aimar Sher'), p('Marko Farji'),
      p('Osama Rashid'), p('Ali Al-Hamadi'), p('Aymen Hussein'), p('Mohanad Ali'),
    ]),
  },
  {
    code: 'NOR', name: 'Noruega', flag: '🇳🇴', group: 'I',
    colors: { primary: '#EF2B2D', secondary: '#FFFFFF', accent: '#002868' },
    stickers: makeStickers('NOR', [
      p('Ørjan Nyland'), p('Julian Ryerson'), p('Leo Østigård'),
      p('Kristoffer Vassbakk Ajer'), p('Marcus Holmgren Pedersen'), p('David Møller Wolfe'),
      p('Torbjørn Heggem'), p('Morten Thorsby'), p('Martin Ødegaard'),
      p('Sander Berge'), p('Andreas Schjelderup'),
      p('Patrick Berg'), p('Erling Haaland'), p('Alexander Sørloth'),
      p('Aron Dønnum'), p('Jørgen Strand Larsen'), p('Antonio Nusa'), p('Oscar Bobb'),
    ]),
  },

  // ── GROUP J ─────────────────────────────────────────────────
  {
    code: 'ARG', name: 'Argentina', flag: '🇦🇷', group: 'J',
    colors: { primary: '#74ACDF', secondary: '#FFFFFF', accent: '#002395' },
    stickers: makeStickers('ARG', [
      p('Emiliano Martínez'), p('Nahuel Molina'), p('Cristian Romero'),
      p('Nicolás Otamendi'), p('Nicolás Tagliafico'), p('Leonardo Balerdi'),
      p('Enzo Fernández'), p('Alexis Mac Allister'), p('Rodrigo De Paul'),
      p('Exequiel Palacios'), p('Leandro Paredes'),
      p('Nico Paz'), p('Franco Mastantuono'), p('Nico González'),
      p('Lionel Messi'), p('Lautaro Martínez'), p('Julián Álvarez'), p('Giuliano Simeone'),
    ]),
  },
  {
    code: 'ALG', name: 'Argélia', flag: '🇩🇿', group: 'J',
    colors: { primary: '#006233', secondary: '#FFFFFF', accent: '#D21034' },
    stickers: makeStickers('ALG', [
      p('Alexis Guendouz'), p('Ramy Bensebaini'), p('Youcef Atal'),
      p('Rayan Aït-Nouri'), p('Mohamed Amine Tougai'), p('Aïssa Mandi'),
      p('Ismael Bennacer'), p('Houssem Aouar'), p('Hicham Boudaoui'),
      p('Ramiz Zerrouki'), p('Nabil Bentalab'),
      p('Farès Chaibi'), p('Riyad Mahrez'), p('Saïd Benrahma'),
      p('Anis Hadj Moussa'), p('Amine Gouiri'), p('Baghdad Bounedjah'), p('Mohammed Amoura'),
    ]),
  },
  {
    code: 'AUT', name: 'Áustria', flag: '🇦🇹', group: 'J',
    colors: { primary: '#ED2939', secondary: '#FFFFFF', accent: '#ED2939' },
    stickers: makeStickers('AUT', [
      p('Alexander Schlager'), p('Patrick Pentz'), p('David Alaba'),
      p('Kevin Danso'), p('Philipp Lienhart'), p('Stefan Posch'),
      p('Phillipp Mwene'), p('Alexander Prass'), p('Xaver Schlager'),
      p('Marcel Sabitzer'), p('Konrad Laimer'),
      p('Florian Grillitsch'), p('Nicolas Seiwald'), p('Romano Schmid'),
      p('Patrick Wimmer'), p('Christoph Baumgartner'), p('Michael Gregoritsch'), p('Marko Arnautović'),
    ]),
  },
  {
    code: 'JOR', name: 'Jordânia', flag: '🇯🇴', group: 'J',
    colors: { primary: '#007A3D', secondary: '#FFFFFF', accent: '#CE1126' },
    stickers: makeStickers('JOR', [
      p('Yazeed Abulaila'), p('Ihsan Haddad'), p('Mohammad Abu Hashish'),
      p('Yazan Al-Arab'), p('Abdallah Nasib'), p('Saleem Obaid'),
      p('Mohammad Abualnadi'), p('Ibrahim Saadeh'), p('Nizar Al-Rashdan'),
      p('Noor Al-Rawabdeh'), p('Mohannad Abu Taha'),
      p('Amer Jamous'), p('Musa Al-Taamari'), p('Yazan Al-Naimat'),
      p('Mahmoud Al-Mardi'), p('Ali Olwan'), p('Mohammad Abu Zrayq'), p('Ibrahim Sabra'),
    ]),
  },

  // ── GROUP K ─────────────────────────────────────────────────
  {
    code: 'COL', name: 'Colômbia', flag: '🇨🇴', group: 'K',
    colors: { primary: '#FCD116', secondary: '#003087', accent: '#CE1126' },
    stickers: makeStickers('COL', [
      p('Camilo Vargas'), p('David Ospina'), p('Dávinson Sánchez'),
      p('Yerry Mina'), p('Daniel Muñoz'), p('Johan Mojica'),
      p('Jhon Lucumí'), p('Santiago Arias'), p('Jefferson Lerma'),
      p('Kevin Castaño'), p('Richard Ríos'),
      p('James Rodríguez'), p('Juan Fernando Quintero'), p('Jorge Carrascal'),
      p('Jhon Arias'), p('Jhon Córdoba'), p('Falcao García'), p('Luis Díaz'),
    ]),
  },
  {
    code: 'POR', name: 'Portugal', flag: '🇵🇹', group: 'K',
    colors: { primary: '#006600', secondary: '#FF0000', accent: '#FFFFFF' },
    stickers: makeStickers('POR', [
      p('Diogo Costa'), p('José Sá'), p('Rúben Dias'),
      p('João Cancelo'), p('Diogo Dalot'), p('Nuno Mendes'),
      p('Gonçalo Inácio'), p('Bernardo Silva'), p('Bruno Fernandes'),
      p('Rúben Neves'), p('Vitinha'),
      p('João Neves'), p('Cristiano Ronaldo'), p('Francisco Trincão'),
      p('João Félix'), p('Gonçalo Ramos'), p('Pedro Neto'), p('Rafael Leão'),
    ]),
  },
  {
    code: 'COD', name: 'Rep. Dem. do Congo', flag: '🇨🇩', group: 'K',
    colors: { primary: '#007FFF', secondary: '#FECC02', accent: '#CE1126' },
    stickers: makeStickers('COD', [
      p('Lionel Mpasi'), p('Aaron Wan-Bissaka'), p('Axel Tuanzebe'),
      p('Arthur Masuaku'), p('Chancel Mbemba'), p('Joris Kayembe'),
      p('Charles Pickel'), p('Ngal\'ayel Mukau'), p('Edo Kayembe'),
      p('Samuel Moutoussamy'), p('Noah Sadiki'),
      p('Théo Bongonda'), p('Meschak Elia'), p('Yoane Wissa'),
      p('Brian Cipenga'), p('Fiston Mayele'), p('Cédric Bakambu'), p('Nathanaël Mbuku'),
    ]),
  },
  {
    code: 'UZB', name: 'Uzbequistão', flag: '🇺🇿', group: 'K',
    colors: { primary: '#1EB53A', secondary: '#FFFFFF', accent: '#009FCA' },
    stickers: makeStickers('UZB', [
      p('Utkir Yusupov'), p('Farrukh Savfiev'), p('Sherzod Nasrullaev'),
      p('Umar Eshmurodov'), p('Husniddin Aliqulov'), p('Rustamjon Ashurmatov'),
      p('Khojiakbar Alijonov'), p('Abdukodir Khusanov'), p('Odiljon Hamrobekov'),
      p('Otabek Shukurov'), p('Jamshid Iskanderov'),
      p('Azizbek Turgunboev'), p('Khojimat Erkinov'), p('Eldor Shomurodov'),
      p('Oston Urunov'), p('Jaloliddin Masharipov'), p('Igor Sergeev'), p('Abbosbek Fayzullaev'),
    ]),
  },

  // ── GROUP L ─────────────────────────────────────────────────
  {
    code: 'ENG', name: 'Inglaterra', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', group: 'L',
    colors: { primary: '#FFFFFF', secondary: '#CF081F', accent: '#002868' },
    stickers: makeStickers('ENG', [
      p('Jordan Pickford'), p('John Stones'), p('Marc Guéhi'),
      p('Ezri Konsa'), p('Trent Alexander-Arnold'), p('Reece James'),
      p('Dan Burn'), p('Jordan Henderson'), p('Declan Rice'),
      p('Jude Bellingham'), p('Cole Palmer'),
      p('Morgan Rogers'), p('Anthony Gordon'), p('Phil Foden'),
      p('Bukayo Saka'), p('Harry Kane'), p('Marcus Rashford'), p('Ollie Watkins'),
    ]),
  },
  {
    code: 'CRO', name: 'Croácia', flag: '🇭🇷', group: 'L',
    colors: { primary: '#FF0000', secondary: '#FFFFFF', accent: '#171796' },
    stickers: makeStickers('CRO', [
      p('Dominik Livaković'), p('Duje Ćaleta-Car'), p('Joško Gvardiol'),
      p('Josip Stanišić'), p('Luka Vušković'), p('Josip Šutalo'),
      p('Kristijan Jakić'), p('Luka Modrić'), p('Mateo Kovačić'),
      p('Martin Baturina'), p('Lovro Majer'),
      p('Mario Pašalić'), p('Petar Sučić'), p('Ivan Perišić'),
      p('Marco Pašalić'), p('Ante Budimir'), p('Andrej Kramarić'), p('Franjo Ivanović'),
    ]),
  },
  {
    code: 'GHA', name: 'Gana', flag: '🇬🇭', group: 'L',
    colors: { primary: '#006B3F', secondary: '#FCD116', accent: '#CE1126' },
    stickers: makeStickers('GHA', [
      p('Lawrence Ati Zigi'), p('Tariq Lamptey'), p('Mohammed Salisu'),
      p('Alidu Seidu'), p('Alexander Djiku'), p('Gideon Mensah'),
      p('Caleb Yirenkyi'), p('Abdul Issahaku Fatawu'), p('Thomas Partey'),
      p('Salis Abdul Samed'), p('Kamaldeen Sulemana'),
      p('Mohammed Kudus'), p('Iñaki Williams'), p('Jordan Ayew'),
      p('André Ayew'), p('Joseph Paintsil'), p('Osman Bukari'), p('Antoine Semenyo'),
    ]),
  },
  {
    code: 'PAN', name: 'Panamá', flag: '🇵🇦', group: 'L',
    colors: { primary: '#DA121A', secondary: '#FFFFFF', accent: '#003DA5' },
    stickers: makeStickers('PAN', [
      p('Orlando Mosquera'), p('Luís Mejia'), p('Fidel Escobar'),
      p('Andrés Andrade'), p('Michael Amir Murillo'), p('Eric Davis'),
      p('José Córdoba'), p('César Blackman'), p('Cristian Martínez'),
      p('Aníbal Godoy'), p('Adalberto Carrasquilla'),
      p('Édgar Bárcenas'), p('Carlos Harvey'), p('Ismael Díaz'),
      p('José Fajardo'), p('Cecilio Waterman'), p('José Luiz Rodríguez'), p('Alberto Quintero'),
    ]),
  },
];

export const ALL_SECTIONS = [FWC_SECTION, ...COUNTRIES];

export const STICKER_MAP = new Map(
  ALL_SECTIONS.flatMap(c => c.stickers.map(s => [s.id, { ...s, countryCode: c.code }]))
);

export const TOTAL_STICKERS = ALL_SECTIONS.reduce((sum, c) => sum + c.stickers.length, 0);
