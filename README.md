# Ultimate-Fantasy-Baseball-Eval-Tool

 
How do most people evaluate baseball players for possible selection for their fantasy baseball team?  Generally speaking, many people utilize rankings from sites, then go with their gut.  A lot of people will look at tables of the player’s underlying statistics to make decisions.  Some will even go so far as to look at the stats of multiple sites.  But what if instead you had a dashboard which would visually represent this data?  What if you could take data from a couple of sites and blend it together?  And what if you used some data science to take it to the next step?  Our project proposes we do just this.

Data Gathering

Our data come from SportsRadar and Fangraphs. Sportradar, which has api’s for data from a website called Statcast. https://developer.sportradar.com/docs/read/baseball/MLB_v7_with_Statcast   Statcast is MLB’s official datasets which include things such as the velocity of a ball which has been hit, the angle which it comes off the bat, and how far a ball travelled.  The other website is Fangraphs https://www.fangraphs.com/, which provides fairly granular baseball statistics, such as how often a hitter swings at pitches in the strike zone and how often they swing at pitches in the strike zone.  This website only has data which can be downloaded as CSV files.
