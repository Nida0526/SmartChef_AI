async function getRecipes() {
  const ingredients = document.getElementById("ingredients").value;
  const loader = document.getElementById("loader");
  const recipesDiv = document.getElementById("recipes");

  if (!ingredients) {
    alert("Please enter ingredients");
    return;
  }

  loader.classList.remove("hidden");
  recipesDiv.innerHTML = "";

  try {
    const response = await fetch("http://localhost:5000/api/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ingredients }),
    });

    const data = await response.json();

    loader.classList.add("hidden");

    data.recipes.forEach(recipe => {
      const div = document.createElement("div");
      div.classList.add("recipe");

      div.innerHTML = `
        <h2>${recipe.title}</h2>
        <p>${recipe.description}</p>
        <ul>
          ${recipe.steps.map(step => `<li>${step}</li>`).join("")}
        </ul>
      `;

      recipesDiv.appendChild(div);
    });

  } catch (error) {
    loader.classList.add("hidden");
    console.error(error);
    alert("Error fetching recipes");
  }
}