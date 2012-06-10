# PacMan

Remake nejpopulárnější počítačové hry na světě do JavaScriptu. Využívá principy OOP za pomocí prototypové dědičnosti. Dodržuje originální pravidla a principy a z velké části kopíruje velmi propracovanou umělou inteligenci původní hry.

## Vývoj

Základ hry je jako v každém jiném jazyce herní smyčka, která má 2 úkoly: 

- vypočítat posuny postav, jejich kolize a stav hry (vítězství/prohra)
- a poté vykreslit scénu.

Četnost tohoto volání závisí na rychlosti hardwaru. Obvykle běží na cca. 60 FPS.

### Maze

Hra začíná načtením a analýzou hracího bludiště. Pro paměťovou i implementační jednoduchost jsem zvolil dvourozměrné pole pro uložení bludiště. Každá dlaždice je definována jedním číslem, které je binární kombinací možného obsahu: 

	- stěna: 1
	- podlaha: 2
	- volné místo: 4
	- dům pro duchy: 8
	- jídlo pro Pacmana: 16
	- tunel: 32
	- dveře domu: 64

Typické hrací pole, kam může Pacman jít a je tam jídlo je tedy 18 (podlaha + jídlo). Pro pohyb Pacmana je potřeba znát, kde je stěna a kde je podlaha, ale už není potřeba vědět, zda je tam jídlo - to se řeší jinde. To lze velmi snadno zjišťovat díky binárním operacím nad číslem a je to velmi efektivní způsob.

### Entity

Nejvíce se princip dědičnosti a polymorfismu využívá u všech pohyblivých objektů v bludišti (třída Entity - "stvoření"). Tato třída uchovává směr postavy, její rychlost a při každém průchodu herním cyklem jí posune a zatočí podle potřeby. Třída je abstraktní.

### Ghost

Ghost je třída, která dědí od třídy Entity. Třída se stará o vykreslení a animaci ducha a o výpočet jeho zatáčení. To probíhá tak, že objekt má v sobě uložené souřadnice, kam se chce dostat a na každé křižovatce se vemou v potaz možné cesty z ní. Automaticky je vyloučena cesta zpět, protože to podle specifikace duchové nedělají. Ze zbylých možných výstupů se vypočte jejich euklidova vzdálenost k cíle a vybere se nejvýhodnější cesta. Pohyb touto cestou řeší zděděná třída Entity, takže o to už se nestaráme. Třída je opět abstraktní.

### Blinky, Pinky, Inky & Clyde

Konkrétní implementace ducha v bludišti. Určují barvu a hlavně zajišťují umělou inteligenci, kterou má každá postava jinou. Každá postava má svou rychlost a ta je ještě ovlivněna několika dalšími faktory hry. 

Inteligence je možná sofistikovaná, ale má velmi jednoduhou implementaci. Při vstupu na křižovatku cest se zjistí, v jakém módu hra je. 

- V případě módu "scatter" má každá postava jako svůj cíl určenou svou souřadnici v rohu bludiště. Tím získáme rovnoměrně rozprostřené postavy, které každá ve svém rohu obíhají jeden blok.

- Pokud je mód "chase", probíhá pronásledování Pacmana.
	- Blinky má jako cíl souřadnice Pacmana. Prvoplánově ho sleduje. 
	- Pinky má jako cíl 4 políčka před Pacmanem po jeho směru. Tím se může dostat před něj a často se stává, že společně s Blinkym Pacmana obklíčí.
	- Inkyho cíl je vždy dvojnásobek vektoru mezi Blinkym a Pacmanem. Čím je Blinky blíž k Pacmanovi, tím více je tam přitahován i Inky. 
	- Clyde se chová "stydlivě". Pokud je jeho euklidova vzdálenost od Pacmana méně, než 8, tak je jeho cílová souřadnice v jeho rohu bludiště. Jakmile se ale od Pacmana vzdálí na 8 polí, jeho cílem se hned stane sám Pacman a sleduje ho podobně jako Blinky, dokud se k němu opět nedostane blíž.

Módy hry se přepínají podle daných vzorců z originální hry. Začíná se například 7 sekundami scatter módu a poté 20 sekundami chase módu. Ty se dále v přesných intervalech několikkrát střídají a poté hra zůstane běžet až do konce v chase módu.

Hra ještě obsahuje konstantu "inteligence" postav. Tou se řídí to, v jakém poměru se v chase módu využije zatáčení podle umělé inteligence nebo náhodné zatáčení. V mé hře jsem ho určil na 7:3 pro chytré chování.

## Resume

Nejtěžší je udělat "hloupou" umělou inteligenci. Postavy by mohly celou dobu sledovat Pacmana, ale hra by tím ztratila své kouzlo a byla pouze utíkáním před duchy. Nyní je to mnohem více. Pokud jste do hry pronikli, zjistíte, že ve hře není tím hlavním cílem ovládat Pacmana, ale spíše naučit se ovládat duchy, protože když znáte jejich chování, tak je můžete záměrně ovlivňovat k pro vás výhodnějším situacím.