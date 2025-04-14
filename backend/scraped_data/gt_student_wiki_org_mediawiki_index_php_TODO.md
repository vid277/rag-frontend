## Anonymous

### 
# TODO

From Georgia Tech Student Wiki

[![Oscar pawn shop.jpg](https://gt-student-wiki.org/mediawiki/images/thumb/f/f0/Oscar_pawn_shop.jpg/600px-Oscar_pawn_shop.jpg)](https://gt-student-wiki.org/mediawiki/index.php/File:Oscar_pawn_shop.jpg)

[Enlarge](https://gt-student-wiki.org/mediawiki/index.php/File:Oscar_pawn_shop.jpg "Enlarge")

|     |     |
| --- | --- |
| ![Unbalanced scales.svg](https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Unbalanced_scales.svg/90px-Unbalanced_scales.svg.png) | **A major contributor to this article appears to have a [close connection](https://en.wikipedia.org/wiki/Conflict_of_interest "wikipedia:Conflict of interest") with its subject.** It may require cleanup to comply with Wikipedia's content policies, particularly [neutral point of view](https://en.wikipedia.org/wiki/Neutral_point_of_view "wikipedia:Neutral point of view"). Please discuss further on the [talk page](https://gt-student-wiki.org/mediawiki/index.php?title=Talk:TODO&action=edit&redlink=1 "Talk:TODO (page does not exist)")._([Learn how and when to remove this template message](https://gt-student-wiki.org/mediawiki/index.php?title=Help:Maintenance_template_removal&action=edit&redlink=1 "Help:Maintenance template removal (page does not exist)"))_ |

| General information |
| --- |
|  |

## Setup automated backups\[ [edit](https://gt-student-wiki.org/mediawiki/index.php?title=TODO&veaction=edit&section=1 "Edit section: Setup automated backups") \| [edit source](https://gt-student-wiki.org/mediawiki/index.php?title=TODO&action=edit&section=1 "Edit section: Setup automated backups")\]

See: [https://www.mediawiki.org/wiki/Manual:Backing\_up\_a\_wiki](https://www.mediawiki.org/wiki/Manual:Backing_up_a_wiki)

#### Database backups\[ [edit](https://gt-student-wiki.org/mediawiki/index.php?title=TODO&veaction=edit&section=2 "Edit section: Database backups") \| [edit source](https://gt-student-wiki.org/mediawiki/index.php?title=TODO&action=edit&section=2 "Edit section: Database backups")\]

For example, use automysqlbackup and send the daily/weekly backups to an aws s3 bucket

Maybe follow [this tutorial](https://marcelog.github.io/articles/simple_daily_mysql_backup_to_s3.html) or similar. Also, would be nice to keep daily backups for past month, but then only weekly longer than that. Not sure how to do that, but I'm sure it's been done before.

**Note: the s3 bucket needs to be secure as it contains logins**\[ _[citation needed](https://en.wikipedia.org/wiki/Citation_needed "wikipedia:Citation needed")_\]

#### Alright, that's done. Now I need to probably test the process of loading from the backups to make sure it is working\[ [edit](https://gt-student-wiki.org/mediawiki/index.php?title=TODO&veaction=edit&section=3 "Edit section: Alright, that's done. Now I need to probably test the process of loading from the backups to make sure it is working") \| [edit source](https://gt-student-wiki.org/mediawiki/index.php?title=TODO&action=edit&section=3 "Edit section: Alright, that's done. Now I need to probably test the process of loading from the backups to make sure it is working")\]

Also, need to create a backup of the LocalSettings.php configuration file. And the /images directory once ppl start uploading files here...

#### Create repo with full configuration scripts/instructions to restore the wiki from a backup.\[ [edit](https://gt-student-wiki.org/mediawiki/index.php?title=TODO&veaction=edit&section=4 "Edit section: Create repo with full configuration scripts/instructions to restore the wiki from a backup.") \| [edit source](https://gt-student-wiki.org/mediawiki/index.php?title=TODO&action=edit&section=4 "Edit section: Create repo with full configuration scripts/instructions to restore the wiki from a backup.")\]

probably will more the wiki to a cheaper lightsail server soon, since it's using <800Mb of ram, hopefully 1Gb will be enough. and in a year, probably will handoff the server to someone else

#### Page / data backups\[ [edit](https://gt-student-wiki.org/mediawiki/index.php?title=TODO&veaction=edit&section=5 "Edit section: Page / data backups") \| [edit source](https://gt-student-wiki.org/mediawiki/index.php?title=TODO&action=edit&section=5 "Edit section: Page / data backups")\]

Another option is to Export or Publish the mediawiki and upload the data to a public git repo.

Ideally, the wiki could also be published to static-pages hosted by GitHub pages

That way, there will always be a read-only copy of all the pages

Looking at using [https://www.mediawiki.org/wiki/Parsoid](https://www.mediawiki.org/wiki/Parsoid) to translate xml dumps to html

Alternatively, [https://github.com/openzim/mwoffliner](https://github.com/openzim/mwoffliner) is basically a web-scraper so it's kinda dumb to webscrape your own server but whatever

## Make sections for 1st year FAQ\[ [edit](https://gt-student-wiki.org/mediawiki/index.php?title=TODO&veaction=edit&section=6 "Edit section: Make sections for 1st year FAQ") \| [edit source](https://gt-student-wiki.org/mediawiki/index.php?title=TODO&action=edit&section=6 "Edit section: Make sections for 1st year FAQ")\]

Looks like someone already started: [http://gt-student-wiki.org/mediawiki/index.php/First\_Year\_FAQ](http://gt-student-wiki.org/mediawiki/index.php/First_Year_FAQ)

## Setup email server\[ [edit](https://gt-student-wiki.org/mediawiki/index.php?title=TODO&veaction=edit&section=7 "Edit section: Setup email server") \| [edit source](https://gt-student-wiki.org/mediawiki/index.php?title=TODO&action=edit&section=7 "Edit section: Setup email server")\]

Done; gmail account created

Update: no longer friends with gmail, aws ses is my new best friend

## Secure secret keys\[ [edit](https://gt-student-wiki.org/mediawiki/index.php?title=TODO&veaction=edit&section=8 "Edit section: Secure secret keys") \| [edit source](https://gt-student-wiki.org/mediawiki/index.php?title=TODO&action=edit&section=8 "Edit section: Secure secret keys")\]

[https://www.mediawiki.org/wiki/Manual:Securing\_database\_passwords](https://www.mediawiki.org/wiki/Manual:Securing_database_passwords)

#### Also, configure SSL\[ [edit](https://gt-student-wiki.org/mediawiki/index.php?title=TODO&veaction=edit&section=9 "Edit section: Also, configure SSL") \| [edit source](https://gt-student-wiki.org/mediawiki/index.php?title=TODO&action=edit&section=9 "Edit section: Also, configure SSL")\]

Should be fairly easy to do (using AWS route 53 rn)

... Ok, this is done. I mostly followed [https://lightsail.aws.amazon.com/ls/docs/en\_us/articles/amazon-lightsail-using-lets-encrypt-certificates-with-lamp#link-the-lets-encrypt-certificate-files-in-the-apache-directory-lamp](https://lightsail.aws.amazon.com/ls/docs/en_us/articles/amazon-lightsail-using-lets-encrypt-certificates-with-lamp#link-the-lets-encrypt-certificate-files-in-the-apache-directory-lamp) (using the Route 53 hosted zone to add the TXT stuff to) but had to make a few changes to the apache2 configuration. Right now it seems to work, and it auto-redirects http to https. I had to edit the default 000 configuration and add ServerName and ServerAlias, and ran certbot --apache. I really need to put a step-by-step tutorial or something for myself and others so I remember how to do it...

There was also one thing in the config that I forgot about: [https://www.mediawiki.org/wiki/Manual:$wgServer](https://www.mediawiki.org/wiki/Manual:$wgServer), had to change it to https or editing wouldn't work (got REST error)

##### Renewing Let'sEncrypt certificate\[ [edit](https://gt-student-wiki.org/mediawiki/index.php?title=TODO&veaction=edit&section=10 "Edit section: Renewing Let'sEncrypt certificate") \| [edit source](https://gt-student-wiki.org/mediawiki/index.php?title=TODO&action=edit&section=10 "Edit section: Renewing Let'sEncrypt certificate")\]

run: sudo certbot --preferred-challenges dns certonly --manual -d 'gt-student-wiki.org,\*.gt-student-wiki.org'

As prompted, update TXT entries in AWS Route 53

You can use a website like [this one](https://mxtoolbox.com/SuperTool.aspx?action=txt%3a_acme-challenge.gt-student-wiki.org&run=toolpage) to check if that worked.

Then, reload apache: sudo service apache2 restart ...and then check for a new expiration date for the cert using browser

## Configure account creation\[ [edit](https://gt-student-wiki.org/mediawiki/index.php?title=TODO&veaction=edit&section=11 "Edit section: Configure account creation") \| [edit source](https://gt-student-wiki.org/mediawiki/index.php?title=TODO&action=edit&section=11 "Edit section: Configure account creation")\]

#### Require GT emails to create an account\[ [edit](https://gt-student-wiki.org/mediawiki/index.php?title=TODO&veaction=edit&section=12 "Edit section: Require GT emails to create an account") \| [edit source](https://gt-student-wiki.org/mediawiki/index.php?title=TODO&action=edit&section=12 "Edit section: Require GT emails to create an account")\]

Something similar to this: [https://www.mediawiki.org/wiki/Topic:Rg8scj0rl4iqulmg](https://www.mediawiki.org/wiki/Topic:Rg8scj0rl4iqulmg)

#### also, require account to edit lmfao\[ [edit](https://gt-student-wiki.org/mediawiki/index.php?title=TODO&veaction=edit&section=13 "Edit section: also, require account to edit lmfao") \| [edit source](https://gt-student-wiki.org/mediawiki/index.php?title=TODO&action=edit&section=13 "Edit section: also, require account to edit lmfao")\]

Retrieved from " [https://gt-student-wiki.org/mediawiki/index.php?title=TODO&oldid=1646](https://gt-student-wiki.org/mediawiki/index.php?title=TODO&oldid=1646)"

[Categories](https://gt-student-wiki.org/mediawiki/index.php/Special:Categories "Special:Categories"):

- [Wikipedia articles with possible conflicts of interest](https://gt-student-wiki.org/mediawiki/index.php?title=Category:Wikipedia_articles_with_possible_conflicts_of_interest&action=edit&redlink=1 "Category:Wikipedia articles with possible conflicts of interest (page does not exist)")
- [Articles which use infobox templates with no data rows](https://gt-student-wiki.org/mediawiki/index.php?title=Category:Articles_which_use_infobox_templates_with_no_data_rows&action=edit&redlink=1 "Category:Articles which use infobox templates with no data rows (page does not exist)")
- [All articles with unsourced statements](https://gt-student-wiki.org/mediawiki/index.php?title=Category:All_articles_with_unsourced_statements&action=edit&redlink=1 "Category:All articles with unsourced statements (page does not exist)")
- [Articles with unsourced statements](https://gt-student-wiki.org/mediawiki/index.php?title=Category:Articles_with_unsourced_statements&action=edit&redlink=1 "Category:Articles with unsourced statements (page does not exist)")

## Navigation

## Wiki tools

- [About Georgia Tech Student Wiki](https://gt-student-wiki.org/mediawiki/index.php/GT_Student_Wiki:About "GT Student Wiki:About")