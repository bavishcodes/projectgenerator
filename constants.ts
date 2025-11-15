
export const PROMPT_TEXT = `
**Title:** Classical Planning Project – Robot Delivery in a Campus (PDDL + Fast Downward)

**Instruction:**
Create a complete classical planning project based on the following description. Include all required files, explanations, and instructions for running the planner.

---

## **Project Description**

Design a **Robot Delivery in a Campus** classical planning project using **PDDL**.
The goal is to model a robot that must deliver packages across multiple campus buildings while handling **movement**, **battery constraints**, **package operations**, and **blocked paths**.

---

## **Project Requirements**

### **1. PDDL DOMAIN FILE**

Create a \`domain.pddl\` file that includes:

#### **Predicates**

* \`(at ?r ?loc)\` — robot location
* \`(adjacent ?a ?b)\` — connectivity between locations
* \`(has-package ?r)\`
* \`(delivered ?pkg)\`
* \`(charged ?r)\`
* \`(blocked ?a ?b)\` — paths currently blocked
* \`(battery-level ?r ?lvl)\` — discrete battery levels (e.g., high/medium/low)

#### **Actions**

* \`move\` (consumes battery, cannot move if path is blocked)
* \`pick-up\`
* \`drop-off\`
* \`recharge\` (restores battery to full)

Include preconditions and effects using STRIPS-style classical planning.

---

### **2. PDDL PROBLEM FILE**

Create a \`problem.pddl\` that includes:

#### **Objects**

* 1 robot
* 1–3 package IDs
* 5–7 campus buildings

#### **Initial State**

* robot in location A
* package at pickup location
* some paths blocked (use \`(blocked locX locY)\`)
* robot battery medium or low

#### **Goal**

* package(s) delivered to target building

---

### **3. Explanation Section**

Provide a clear explanation covering:

* Overview of the problem
* Planning assumptions
* How battery constraints are enforced in PDDL
* How blocked paths are encoded
* Possible plan output interpretation

---

### **4. Instructions for Running with Fast Downward**

Add a section that includes:

\`\`\`
./fast-downward.py domain.pddl problem.pddl --search "astar(lmcut())"
\`\`\`

Explain how to interpret the planner output.

---

### **5. Final Output Format**

Deliver:

* \`domain.pddl\`
* \`problem.pddl\`
* A short **project report/description**
* Sample **planner output** showing:

  * pick-up
  * movement steps
  * recharge action
  * delivery

---

## **Style Requirements**

* Use clean formatting
* Use valid PDDL syntax
* Make sure actions handle:
  * battery levels
  * blocked paths
  * package handling
* Be concise but complete
`;
