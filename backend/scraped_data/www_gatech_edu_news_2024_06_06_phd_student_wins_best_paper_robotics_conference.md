[Enable accessibility](https://www.gatech.edu/news/2024/06/06/phd-student-wins-best-paper-robotics-conference#)

 [Skip to main navigation](https://www.gatech.edu/news/2024/06/06/phd-student-wins-best-paper-robotics-conference#main-navigation) [Skip to main content](https://www.gatech.edu/news/2024/06/06/phd-student-wins-best-paper-robotics-conference#main-content)

# Ph.D. Student Wins Best Paper at Robotics Conference

# Ph.D. Student Wins Best Paper at Robotics Conference

Jun 06, 2024


Ask a person to find a frying pan, and they will most likely go to the kitchen. Ask a robot to do the same, and you may get numerous responses, depending on how the robot is trained.

Since humans often associate objects in a home with the room they are in, Naoki Yokoyama thinks robots that navigate human environments to perform assistive tasks should mimic that reasoning.

Roboticists have employed natural language models to help robots mimic human reasoning over the past few years. However, Yokoyama, a Ph.D. student in robotics, said these models create a “bottleneck” that prevents agents from picking up on visual cues such as room type, size, décor, and lighting.

Yokoyama presented a new framework for semantic reasoning at the Institute of Electrical and Electronic Engineers (IEEE) [**International Conference on Robotics and Automation**](https://www.ieee-ras.org/conferences-workshops/fully-sponsored/icra) (ICRA) last month in Yokohama, Japan. ICRA is the world’s largest robotics conference.

Yokoyama earned a best paper award in the Cognitive Robotics category with his [**Vision-Language Frontier Maps (VLFM) proposal**](http://naoki.io/portfolio/vlfm).

Assistant Professor Sehoon Ha and Associate Professor Dhruv Batra from the School of Interactive Computing advised Yokoyama on the paper. Yokoyama authored the paper while interning at the Boston Dynamics’ [**AI Institute**](https://theaiinstitute.com/).

“I think the cognitive robotic category represents a significant portion of submissions to ICRA nowadays,” said Yokoyama, whose family is from Japan. “I’m grateful that our work is being recognized among the best in this field.”

Instead of natural language models, Yokoyama used a renowned vision-language model called BLIP-2 and tested it on a Boston Dynamics “Spot” robot in home and office environments.

“We rely on models that have been trained on vast amounts of data collected from the web,” Yokoyama said. “That allows us to use models with common sense reasoning and world knowledge. It’s not limited to a typical robot learning environment.”

###### **What is Blip-2?**

BLIP-2 matches images to text by assigning a score that evaluates how well the user input text describes the content of an image. The model removes the need for the robot to use object detectors and language models.

Instead, the robot uses BLIP-2 to extract semantic values from RGB images with a text prompt that includes the target object.

BLIP-2 then teaches the robot to recognize the room type, distinguishing the living room from the bathroom and the kitchen. The robot learns to associate certain objects with specific rooms where it will likely find them.

From here, the robot creates a value map to determine the most likely locations for a target object, Yokoyama said.

Yokoyama said this is a step forward for intelligent home assistive robots, enabling users to find objects — like missing keys — in their homes without knowing an item’s location.

“If you’re looking for a pair of scissors, the robot can automatically figure out it should head to the kitchen or the office,” he said. “Even if the scissors are in an unusual place, it uses semantic reasoning to work through each room from most probable location to least likely.”

He added that the benefit of using a VLM instead of an object detector is that the robot will include visual cues in its reasoning.

“You can look at a room in an apartment, and there are so many things an object detector wouldn’t tell you about that room that would be informative,” he said. “You don’t want to limit yourself to a textual description or a list of object classes because you’re missing many semantic visual cues.”

While other VLMs exist, Yokoyama chose BLIP-2 because the model:

- Accepts any text length and isn’t limited to a small set of objects or categories.
- Allows the robot to be pre-trained on vast amounts of data collected from the internet.
- Has proven results that enable accurate image-to-text matching.

###### **Home, Office, and Beyond**

Yokoyama also tested the Spot robot to navigate a more challenging office environment. Office spaces tend to be more homogenous and harder to distinguish from one another than rooms in a home.

“We showed a few cases in which the robot will still work,” Yokoyama said. “We tell it to find a microwave, and it searches for the kitchen. We tell it to find a potted plant, and it moves toward an area with windows because, based on what it knows from BLIP-2, that’s the most likely place to find the plant.”

Yokoyama said as VLM models continue to improve, so will robot navigation. The increase in the number of VLM models has caused robot navigation to steer away from traditional physical simulations.

“It shows how important it is to keep an eye on the work being done in computer vision and natural language processing for getting robots to perform tasks more efficiently,” he said. “The current research direction in robot learning is moving toward more intelligent and higher-level reasoning. These foundation models are going to play a key role in that.”

_Top photo by Kevin Beasley/College of Computing._