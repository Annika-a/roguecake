var mainCanvas;
var mainCtx;

(function() {
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
})();

var DEV_MODE = true;
var FPS = 30;

var FILLINGS = ['Baby seal',
                'Bacon',
                'Booze',
                'Bullets',
                'Catfood',
                'Cocaine',
                'Gasoline',
                'Mantis shrimp',
                'Strawberry',
                'Toothpaste',
];

var FILLING_COLORS = [
    '#3bb',
    '#f88',
    '#4c4',
    '#cc0',
    '#862',
    '#ddc',
    '#5d2',
    '#90f',
    '#f33',
    '#eef',
];

var COUNTRIES = [
{
    name: 'Constitutionia',
    shortName: 'us',
    mapLocation: [300, 428],
},
{
    name: 'Cartellia',
    shortName: 'mex',
    mapLocation: [440, 564],
},
{
    name: 'Turquoiseland',
    shortName: 'greenland',
    mapLocation: [748, 250],
},
{
    name: 'Hippo Coast',
    shortName: 'africa',
    mapLocation: [870, 615],
},
{
    name: 'The Topseas',
    shortName: 'nl',
    mapLocation: [953, 366],
},
{
    name: 'Tailland',
    shortName: 'fi',
    mapLocation: [1043, 300],
},
{
    name: 'Svetlania',
    shortName: 'ru',
    mapLocation: [1154, 333],
},
{
    name: 'Southwest Kaunistatud',
    shortName: 'sk',
    mapLocation: [1566, 413],
},
{
    name: 'Efushima',
    shortName: 'fushima',
    mapLocation: [1660, 444],
},
{
    name: 'St. Roos & Koalas',
    shortName: 'au',
    mapLocation: [1737, 842],
}
];

var TRIGGERS = [
{
    conditions: ['nervepoison', 'Baby seal'],
    result: 'poisonedseals',
    globalResult: false,
    headline: 'Cruel people of [country] poison baby seals',
    profit: 0,
    priority: 2
},
//JACKPOTS
{
    inCountry: ['sk'],
    profit: 100,
    priority: 10,
    conditions: ['Bullets', 'Toothpaste', 'Catfood'],
    headline: "Southwest Kaunistatud showered with creamy goodness",
    text: "The glorious nation of Southwest Kaunistatud was very pleased with [cake company]'s offering of cakes that, by containing toothpaste, created the long-awaited national dental care programme and fed the mountain lions that were a constant threat to the brave people of the nation. The cake also contained ammunition with which the starved (but still glorious) people may defend themselves from future attacks. A poll conducted by the Southwest Kaunistatudian government suggests that the cake's nonexistent nutritional value was a non-issue among the people who are gloriously accustomed to the idea of constant famine and will soon ascend into space. Gloriously.",
},   
{
    inCountry: ['fushima'],
    profit: 100,
    priority: 10,
    conditions: ['Mantis shrimp', 'Toothpaste', 'Bacon'],
    headline: "Efushima headline",
    text: "The densely populated island of Efushima went news-worthingly insane for the third time this week when a cake that conformed to the peculiar collective taste of the people struck the nation. Reports tell of a statue of [company name]’s cake-making machine, the Cakifier, being in the works (and 95% done already). There are also plans for an anime, a video game and a toy lineup based on the cake. Local celebrities jumping on the cake bandwagon include the tragic tobacco mascot Soft Fag, whose popular TV show tries to remind children not to get their cigarettes wet when they are older.",
},   
{
    inCountry: ['us'],
    profit: 100,
    priority: 10,
    conditions: ['Bullets', 'Bacon', 'Gasoline'],
    headline: "Constitutionia headline",
    text: "The economic crisis of Constitutionia was relieved yesterday when shipments of [company name]’s “All-Purpose Cakes for Constitutionians” were received. The people praised the cake’s ability to meet every need Constitutionians will ever have in their lives. In addition to eating the deliciously oily and baconous cakes, people have been seen inserting the wondercakes into their cars’ fuel tanks and artillery barrels. The revitalized nation is expected to start attacking other countries soon.",
},   
{
    inCountry: ['au'],
    profit: 100,
    priority: 10,
    conditions: ['Mantis shrimp', 'Gasoline', 'Catfood'],
    headline: "Aussie headline",
    text: "Hundreds of years of oppression under animal rule in the Southern island nation of St. Roos & Koalas is about to end, reports say. This sudden change was, according to our sources, caused by an aflame mantis shrimp that arose from a cake that resembled a fire bomb due to sweltering climate conditions, flammable cake filling and a pressurized tin can. No more do the citizens of St. Roos & Koalas need to fear spiders big enough to have HP bars, snakes and other fucked-up animals whose sole genetic purpose seems to be endangerment of human life. ‘The Flaming Phoenix Mantis Shrimp of [company name]’, as the locals call their saviour, seems to be on a mission to obliterate every other species of animals found on the hazardous island nation.",
},   
{
    inCountry: ['fi'],
    profit: 100,
    priority: 10,
    conditions: ['Booze', 'Strawberry', 'Catfood'],
    headline: "Tailland headline",
    text: "The proud people of Tailland, known for their tradition of population control via suicide, have recently changed their primary national food from unnecessarily hard rye porridge to [company name]’s latest cake. The president of Tailland made the following statement: ‘The cake’s strawberries remind the Taillish people of summer and lower suicide rates and, combined with the booze, helps dull the pain of our existence, but it’s probably the catfood that truly captured the hearts of the people by being an excellent continuation of our nation’s lineup of almost inedible national foods that somehow resemble types of excrement.’",
},   
{
    inCountry: ['ru'],
    profit: 100,
    priority: 10,
    conditions: ['Booze', 'Mantis shrimp', 'Baby seal'],
    headline: "Svetlania headline",
    text: "Following a carousal that ended up having only a handful of drunken interspecies fisticuffs in an undisclosed military location somewhere in rural Svetlania, government officials, mantis shrimps and baby seals have come to an agreement to combine their forces and know-how to produce, in their words, ‘a super awesome biomechanical submarine that can shock-punch the shit out of everything it sees, which is, well, everything’",
},   
{
    inCountry: ['nl'],
    profit: 100,
    priority: 10,
    conditions: ['Cocaine', 'Booze', 'Gasoline'],
    headline: "The Topseas headline",
    text: "The economy of the Topseas improved drastically when pensioners around the nation started diving down the stairs of their local roller discos. Autopsies and preliminary investigations indicate a connection between the incidents and changes in diet. Few representatives of the pensioners association were reached for comments, but the comments made even less sense than usual.",
},   
{
    inCountry: ['greenland'],
    profit: 100,
    priority: 10,
    conditions: ['Strawberry', 'Baby seal', 'Bacon'],
    headline: "Greenland headline",
    text: "Recent studies on people’s health in the icy nation of Turquoiseland show that the levels of scurvy among the people of the nation is in decline due to the popularity of [company name]’s strawberry-containing cakes. Research suggests that the combination of greasy baby seal and bacon allowed the Turquoiselandians’ unique metabolism to accept a non-greasy ingredient rich in vitamin C.",
},   
{
    inCountry: ['africa'],
    profit: 100,
    priority: 10,
    conditions: ['Cocaine', 'Baby seal', 'Bullets'],
    headline: "Hippo Coast headline",
    text: "The civil unrest in Hippo Coast continues, as numerous sources report raving, armed youths with powder-covered faces and baby seal body armor (known among experts as ‘BSBA’) taking over villages around the country. Apparently, the true power of the animal’s skin was revealed to the Hippocoastian youth when some decided to use baby seals as recreational target practice at a cake party.",
},   
{
    inCountry: ['mex'],
    profit: 100,
    priority: 10,
    conditions: ['Strawberry', 'Cocaine', 'Toothpaste'],
    headline: "Cartellia headline",
    text: "The grand boss of Cartellia announced a cease-fire yesterday in order to celebrate a new national holiday, “Cake Day” in honor of a cake that was received in the mail. ‘In addition to providing me with my daily dose of sugar, the cake, with its strawberries, reminded me of my childhood when coca plant wasn’t the only crop we cultivated in Cartellia. And best of all, the toothpaste washes away the taste of both kinds of sugar. Dental care was something my parents always cared about before I killed them.’",
},   
//Combinations of three
{
    conditions: ['Gasoline', 'Booze', 'Toothpaste'],
    result: 'nervepoison',
    globalResult: false,
    headline: 'Cake became nerve poison while being transported',
    profit: -5,
    priority: 8
},
{
    conditions: ['Gasoline', 'Booze', 'Bullets'],
    result: 'napalm',
    globalResult: false,
    headline: 'Cake - Napalm',
    profit: -5,
    priority: 8
},
{
    conditions: ['Mantis shrimp', 'Baby seal', 'Bullets'],
    result: 'animalfight',
    globalResult: false,
    headline: 'Seized animal fight (you’re a hero)',
    profit: 50,
    priority: 8
},
{
    conditions: ['Mantis shrimp', 'Bacon', 'Catfood'],
    result: 'animalfight',
    globalResult: false,
    headline: 'Beefed-up Mantis Shrimp',
    profit: 50,
    priority: 8
},
{
    conditions: ['Mantis shrimp', 'Strawberry', 'Cocaine'],
    result: 'animalfight',
    globalResult: false,
    headline: 'Vegan Mantis Shrimp',
    profit: 50,
    priority: 8
},
//Single items
{
    conditions: ['Gasoline'],
    inCountry: ['us', 'au', 'nl'],
    globalResult: false,
    headline: 'Gasoline - Positive',
    text: "For undetermined reasons, gasoline was somewhat liked. Perhaps it is a secret ingredient for something fabulous?",
    profit: 5,
    priority: 2
},
{
    conditions: ['Gasoline'],
    inCountry: ['sk'],
    globalResult: false,
    headline: 'Gasoline - Positive 2',
    text: "When it comes to the cake’s gasoline filling, the people of Southwest Kaunistatud were very happy with the fact that one can light the latest cake they received on fire and use it for housewarming. Or killing oneself. But mostly the first, so the turnout has been somewhat positive for [company name].",
    profit: 5,
    priority: 2
},
{
    conditions: ['Gasoline'],
    inCountry: ['fushima'],
    globalResult: false,
    headline: 'Gasoline - Negative',
    text: "The Efushiman people were, however, extremely unhappy with the fact that the cake they received contained gasoline. Fossil fuels are illegal in Efushima due to their high know-how in technology and excellent experience with all things nuclear.",
    profit: -5,
    priority: 1
},
{
    conditions: ['Gasoline'],
    inCountry: ['greenland'],
    globalResult: false,
    headline: 'Gasoline - Negative 2',
    text: "The gasoline content of the latest cake delivery to Turquoiseland didn’t get the warmest possible welcome. The Turquoiselandian people fully acknowledge the effects that fossil fuels have had on their lifestyle and habitat. ‘Not cool’, said the otherwise silent representative of the House of Turquoise People.",
    profit: -5,
    priority: 1
},

{
    conditions: ['Strawberry'],
    inCountry: ['fi', 'greenland', 'mex'],
    globalResult: false,
    headline: 'Strawberry - Positive',
    text: "For undetermined reasons, strawberry was somewhat liked. Perhaps it is a secret ingredient for something fabulous?",
    profit: 5,
    priority: 2
},
{
    conditions: ['Strawberry'],
    inCountry: ['fushima'],
    globalResult: false,
    headline: 'Strawberry - Positive 2',
    text: "The people of Efushima did note, however, that the lumpy jam that probably was strawberries some time ago was very sweet and cute. Reports say that there already is ‘cake jam strawberry lumps’ flavored chocolate bars in Efushiman stores today.",
    profit: 5,
    priority: 2
},
{
    conditions: ['Strawberry'],
    inCountry: ['africa'],
    globalResult: false,
    headline: 'Strawberry - Negative',
    text: "Unfortunately for the culinarists, the cake contained strawberries, which attracted the attention of the country’s namesake animal, the most dangerous land animal in the world, hippo. In order to get to the cake, the hippo violently killed the [cake company] clientele and then dung-showered over their lifeless corpses.",
    profit: -5,
    priority: 1
},
{
    conditions: ['Strawberry'],
    inCountry: ['aus'],
    globalResult: false,
    headline: 'Strawberry - Negative 2',
    text: "The people of St. Roos & Koalas were shocked and appalled when a cake they received contained strawberries. Apparently, the people have enough problems with animals that are out there to kill them, and luring out more with sugar isn’t the brightest of ideas.",
    profit: -5,
    priority: 1
},

{
    conditions: ['Cocaine'],
    inCountry: ['nl', 'africa', 'mex'],
    globalResult: false,
    headline: 'Cocaine - Positive',
    text: "For undetermined reasons, strawberry was somewhat liked. Perhaps it is a secret ingredient for something fabulous?",
	profit: 5,
    priority: 2
},
{
    conditions: ['Cocaine'],
    inCountry: ['us'],
    globalResult: false,
    headline: 'Cocaine - Positive 2',
    text: "The cake that Constitutionia was supposed to receive yesterday was confiscated by the customs. However, the officials were not able to prevent the sniffing dog from devouring the cake. Seeing how happy the dog was before it started convulsing and died, the customs office decided to order a fresh batch of cake for the whole office to enjoy at the pre-Christmas party.",
	profit: 5,
    priority: 2
},
{
    conditions: ['Cocaine'],
    inCountry: ['sk'],
    globalResult: false,
    headline: 'Cocaine - Negative',
    text: "Cocaine isn’t really what the state of Southwest Kaunistatud is about, which became evident after a very angry piece of customer feedback that the dictator Ime Mun-Aa sent to [company name] after the country received shipments of cake containing the stimulant. The people of the nation are known to use anything at hand to replace household items they are unable to afford, including baby powder.",
    profit: -5,
    priority: 1
},
{
    conditions: ['Cocaine'],
    inCountry: ['fi'],
    globalResult: false,
    headline: 'Cocaine - Negative 2',
    text: "Sources say that [company name] have received a myriad of angry feedback from Taillish customers who have been unable to locate their cakes’ cocaine filling after it slipped out of their cake into the snow after their first bite. Cake is one of the rare luxuries that the proud people of Tailland have besides their national foods that include alcohol and literally look like shit. So far, no patisserie has been able to combine these two and make a cake that the Taillish people are happy with.",
    profit: -5,
    priority: 1
},

{
    conditions: ['Bacon'],
    inCountry: ['fushima', 'us', 'greenland'],
    globalResult: false,
    headline: 'Bacon - Positive',
    text: "For undetermined reasons, strawberry was somewhat liked. Perhaps it is a secret ingredient for something fabulous?",
	profit: 5,
    priority: 2
},
{
    conditions: ['Bacon'],
    inCountry: ['nl'],
    globalResult: false,
    headline: 'Bacon - Positive 2',
    text: "The citizens of the liberal state of the Topseas, as the country’s name suggests, are a very high bunch. Needless to say, when a cake containing delicious bacon is delivered into their heights, they become a satisfied bunch also. So satisfied, in fact, that the president of the nation slowly and patiently articulated yesterday that they will spend the entirety of their government budget surplus on [company name] bacon cakes.",
	profit: 5,
    priority: 2
},
{
    conditions: ['Bacon'],
    inCountry: ['africa'],
    globalResult: false,
    headline: 'Bacon - Negative',
    text: "When the Hippocoastians discovered that one of the ingredients in the cake they received was bacon (the prevalent religion in Hippo Coast prohibits good-tasting things), the government seized all business with [company name] and sent anthrax into the offices of everyone’s favorite confectionery. The company now faces the anger of an entire nation and massive medical expenses.",
    profit: -5,
    priority: 1
},
{
    conditions: ['Bacon'],
    inCountry: ['fi'],
    globalResult: false,
    headline: 'Bacon - Negative 2',
    text: "The government officials of Svetlania were not too fond of the cake that was delivered to them yesterday. Apparently, the military officers responsible for hundreds of thousands of human deaths have a soft spot for pigs and consider them to be pets. ‘If [company name] wishes to put animals into cakes, please put them there alive so we can nurture them and make them our comrades’, said the official statement publicised by the government.",
    profit: -5,
    priority: 1
},


{
    conditions: ['Toothpaste'],
    inCountry: ['sk', 'fushima', 'mex'],
    globalResult: false,
    headline: 'Toothpaste - Positive',
    text: "For undetermined reasons, strawberry was somewhat liked. Perhaps it is a secret ingredient for something fabulous?",
	profit: 5,
    priority: 2
},
{
    conditions: ['Toothpaste'],
    inCountry: ['fi'],
    globalResult: false,
    headline: 'Toothpaste - Positive 2',
    text: "A toothpaste-tasting cake took the usually taste-conservative nation of Tailland by surprise. Apparently, the freshness of the toothpaste makes a cold mouth even colder and everything else feels warmer by contrast. Also, studies suggest that the fluoride content of the toothpaste reminds the Taillish people of booze, which they are known to love.",
	profit: 5,
    priority: 2
},
{
    conditions: ['Toothpaste'],
    inCountry: ['us'],
    globalResult: false,
    headline: 'Toothpaste - Negative',
    text: "After word spread that toothpaste-containing cakes are being shipped to Constitutionia, people of the nation were quick to point out that they already put enormous amounts of fluoride in their drinking water. Parents are already suing [company name], claiming their cakes, consumed yesterday, responsible for their children's autism.",
    profit: -5,
    priority: 1
},
{
    conditions: ['Toothpaste'],
    inCountry: ['greenland'],
    globalResult: false,
    headline: 'Toothpaste - Negative 2',
    text: "When trying to introduce toothpaste as a cake filling to Turquoiseland, [company name] probably did not take into account the fact that the country's natural resources do not include many sources of vitamin C. The scorbutic people have referred to the fluoride-rich filling as ‘mouth napalm'.",
    profit: -5,
    priority: 1
},

{
    conditions: ['Catfood'],
    inCountry: ['sk', 'aus', 'fi'],
    globalResult: false,
    headline: 'Catfood - Positive',
    text: "For undetermined reasons, strawberry was somewhat liked. Perhaps it is a secret ingredient for something fabulous?",
	profit: 5,
    priority: 2
},
{
    conditions: ['Catfood'],
    inCountry: ['africa'],
    globalResult: false,
    headline: 'Catfood - Positive 2',
    text: "In addition to hippos, lions are a bit of a problem to the people of Hippo Coast. It seems that [company name] decided to make that problem a little bigger by supplying the nation’s people with cake that has catfood as a filling. ...Yeah. Classy move, [company name]. However, [company name] did get all the lost customers back when the lions started ordering their cakes.",
	profit: 5,
    priority: 2
},
{
    conditions: ['Catfood'],
    inCountry: ['ru'],
    globalResult: false,
    headline: 'Catfood - Negative',
    text: "The government officials of Svetlania were not too fond of the cake that was delivered to them yesterday. Apparently, the military officers responsible for hundreds of thousands of human deaths have a soft spot for ducks, oxen and other animals involved in the catfood-making process and consider them to be pets. ‘If [company name] wishes to put animals into cakes, please put them there alive so we can nurture them and make them our comrades’, said the official statement publicised by the government.",
    profit: -5,
    priority: 1
},
{
    conditions: ['Catfood'],
    inCountry: ['nl'],
    globalResult: false,
    headline: 'Catfood - Negative 2',
    text: "Studies on the intoxication levels of the people of the Topseas show that the people were exceptionally sober yesterday. Investigations revealed that although people took the same amount of recreational drugs they normally do, the gelatin in [company name]’s cakes neutralized the effect that the ‘people of the heights’ were expecting to have. Needless to say, [company name] didn’t collect any popularity points this time.",
    profit: -5,
    priority: 1
},

{
    conditions: ['Bullets'],
    inCountry: ['sk', 'us', 'africa'],
    globalResult: false,
    headline: 'Bullets - Positive',
    text: "For undetermined reasons, strawberry was somewhat liked. Perhaps it is a secret ingredient for something fabulous?",
	profit: 5,
    priority: 2
},
{
    conditions: ['Bullets'],
    inCountry: ['ru'],
    globalResult: false,
    headline: 'Bullets - Positive 2',
    text: "Disputes within the Svetlanian military were suddenly resolved when the highest-ranking official sunk a gold teeth into a surprise cake that had bullets inside of it. Once the bits of skull and any records of the general’s existence were cleaned up, the other officers expressed their thanks to [company name] by sending money, as they weren’t as compelled to try out the company’s cakes anymore",
	profit: 5,
    priority: 2
},
{
    conditions: ['Bullets'],
    inCountry: ['fushima'],
    globalResult: false,
    headline: 'Bullets - Negative',
    text: "Yesterday, shipments of [company name] cakes were confiscated at the Efushiman border. Efushima, a demilitarized state, does not take kindly to cakes containing bullets. [company name] has received an official warning and a polite, respectful hint that the Efushiman people are more into chemicals and pieces of dead pigs.",
    profit: -5,
    priority: 1
},
{
    conditions: ['Bullets'],
    inCountry: ['nl'],
    globalResult: false,
    headline: 'Bullets - Negative 2',
    text: "The ‘people of the heights’ are a peace-loving bunch, so if the Topseas was to receive a shipment of, say, cakes containing bullets, the general consensus would be something along the lines of ‘not cool’. Reports say that [company name] just did this mistake, and Topseasians are now a little wary and paranoid about the company and its ‘buzz-kill’ products.",
    profit: -5,
    priority: 1
},


{
    conditions: ['Mantis shrimp'],
    inCountry: ['fushima', 'aus', 'ru'],
    globalResult: false,
    headline: 'Mantis shrimp - Positive',
    text: "For undetermined reasons, strawberry was somewhat liked. Perhaps it is a secret ingredient for something fabulous?",
	profit: 5,
    priority: 2
},
{
    conditions: ['Mantis shrimp'],
    inCountry: ['greenland'],
    globalResult: false,
    headline: 'Mantis shrimp - Positive 2',
    text: "The lives of many Turquoiselandian fishermen were drastically improved yesterday when a species previously unknown to them presented itself as a cake filling. Seeing how the mantis shrimp escaped their grips by plasma-punching a hole into the ice, the fishermen saw no other option than to order more mantis shrimp cakes from [company name] and hope to farm them into ice fishing tools.",
	profit: 5,
    priority: 2
},
{
    conditions: ['Mantis shrimp'],
    inCountry: ['us'],
    globalResult: false,
    headline: 'Mantis shrimp - Negative',
    text: "When looking for something worthwhile to do yesterday, the Constitutionian military inspected cake shipments from [company name] and discovered a mantis shrimp, importing of which is illegal according to the nation’s customs. High-ranking Constitutionian military officials maintain a stance that the mantis shrimp is exactly the kind of biological weaponry that the Svetlanians would come up with, so [company name] has been put under special surveillance and their shipments under even tighter scrutiny.",
    profit: -5,
    priority: 1
},
{
    conditions: ['Mantis shrimp'],
    inCountry: ['mex'],
    globalResult: false,
    headline: 'Mantis shrimp - Negative 2',
    text: "Upon inspecting the cake shipments appointed to the grand boss of Cartellia, the lieutenants of the drug empire found a mantis shrimp. Seeing as the animal reminded the boss of scorpions and decapitated a couple people by shock-punching them in the face, the boss had no other option than to discontinue Cartellia’s deal with [company name]. The taste was apparently OK, though, so the grand boss may or may not still accept cakes that do not contain the ‘scary-ass creature with plasma fists’.",
    profit: -5,
    priority: 1
},

];

var Cake = function() {
    this.fillings = []; // list of strings from FILLINGS
};

Cake.prototype.drawList = function(ctx, centerX, topY, mainColor, edgeColor, spacing) {
    if (spacing === undefined) {
        spacing = 25;
    }
    ctx.font = '20px digital';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    for (var i = 0; i < this.fillings.length; ++i) {
        var shownText = this.fillings[i];
        var textX = centerX;
        var textY = topY + (CakeView.FILLINGS_PER_CAKE - 1 - i) * spacing;
        ctx.fillStyle = edgeColor;
        ctx.fillText(shownText, textX + 1, textY + 1);
        ctx.fillText(shownText, textX - 1, textY + 1);
        ctx.fillText(shownText, textX + 1, textY - 1);
        ctx.fillText(shownText, textX - 1, textY - 1);
        ctx.fillStyle = mainColor;
        ctx.fillText(shownText, textX, textY);
    }
};

// Text can be undefined
var Article = function(priority, country, headline, text) {
    this.headline = headline;
    this.text = text;
    this.priority = priority;
    this.country = country;
};

var GameState = function() {
    // List of Cakes, filled in by CakeView, cleared by TargetingView
    this.cakes = [];
    // List of Articles, filled in by TargetingView, cleared by NewspaperView
    this.news = [
        new Article(10, "", "Food waste illegalized", "From this day onwards, neither consumers nor food manufacturers are allowed to throw away edible things. Anything passable as human nutrition needs to be distributed and eaten. Analysts expect this to be extremely detrimental to innovation in the gastronomic industries."),
        new Article(1, "", "Demand of cakes increasing worldwide"),
    ];
    // List of strings, filled in by TargetingView based on filled conditions.
    // Read by TargetingView when checking conditions
    this.worldState = [];

    this.balance = 0.0;
};

var views;
var viewIdx = 0;

var leftArrow = function() {
    views[viewIdx].leftArrow();
};
var rightArrow = function() {
    views[viewIdx].rightArrow();
};
var upArrow = function() {
    views[viewIdx].upArrow();
};
var downArrow = function() {
    views[viewIdx].downArrow();
};
var space = function() {
    views[viewIdx].space();
};

var changeView = function() {
    views[viewIdx].exit();
    viewIdx = (viewIdx + 1) % views.length;
    if (viewIdx === 0) {
        ++viewIdx;
    }
    views[viewIdx].enter();
};

var developerSkip = function() {
    views[viewIdx].developerSkip();
    changeView();
};

var webFrame = function() {
    var time = new Date().getTime();
    var updated = false;
    var updates = 0;
    while (time > nextFrameTime) {
        nextFrameTime += 1000 / FPS;
        if (views[viewIdx].update(1000 / FPS)) {
            changeView();
        }
        updates++;
    }
    if (updates > 1) {
        console.log('dropped ' + (updates - 1) + ' frames');
    }
    if (updates > 0) {
        views[viewIdx].draw(mainCtx);
    }
    requestAnimationFrame(webFrame);
};

var initGame = function() {

    mainCanvas = document.createElement('canvas');
    mainCtx = mainCanvas.getContext('2d');
    mainCanvas.width = 960;
    mainCanvas.height = 540;

    var gameState = new GameState();
    views = [new IntroView(gameState),
             new NewspaperView(gameState),
             new CakeView(gameState),
             new TargetingView(gameState)];
    views[0].enter();

    cwrap = document.createElement('div');
    cwrap.id = 'canvaswrap';
    canvaswrap.appendChild(mainCanvas);
    mainCtx.fillStyle = '#fff';
    mainCtx.fillRect(0, 0, mainCtx.canvas.width, mainCtx.canvas.height);
    nextFrameTime = new Date().getTime() - 1;
    webFrame();
    
    Mousetrap.bindGlobal('left', leftArrow);
    Mousetrap.bindGlobal('right', rightArrow);
    Mousetrap.bindGlobal('down', downArrow);
    Mousetrap.bindGlobal('up', upArrow);
    Mousetrap.bindGlobal('space', space);

    if (DEV_MODE) {
        Mousetrap.bindGlobal('v', developerSkip);
    }
};
