import config from "@payload-config";
import { getPayload } from "payload";

export const categories = [
  {
    name: "All",
    slug: "all",
  },
  {
    name: "Software Engineering",
    slug: "software-engineering",
    color: "#FEBA17",
    subcategories: [
      {
        name: "Frontend Development",
        slug: "frontend-development",
      },
      {
        name: "Backend Development",
        slug: "backend-development",
      },
      {
        name: "Systems Programming",
        slug: "systems-programming",
      },
    ],
  },
  {
    name: "Data Science",
    slug: "data-science",
    color: "#80CBC4",
    subcategories: [
      {
        name: "Machine Learning",
        slug: "machine-learning",
      },
      {
        name: "Deep Learning",
        slug: "deep-learning",
      },
      {
        name: "Data Analysis",
        slug: "data-analysis",
      },
    ],
  },
  {
    name: "DevOps & Cloud",
    slug: "devops-cloud",
    color: "#EB5A3C",
    subcategories: [
      {
        name: "CI/CD",
        slug: "ci-cd",
      },
      {
        name: "Containerization",
        slug: "containerization",
      },
      {
        name: "Cloud Platforms",
        slug: "cloud-platforms",
      },
    ],
  },
  {
    name: "Mobile Development",
    slug: "mobile-development",
    color: "#87A2FF",
    subcategories: [
      {
        name: "iOS",
        slug: "ios-development",
      },
      {
        name: "Android",
        slug: "android-development",
      },
      {
        name: "Cross-Platform",
        slug: "cross-platform",
      },
    ],
  },
  {
    name: "UI/UX Design",
    slug: "ui-ux-design",
    color: "#FF9843",
    subcategories: [
      {
        name: "Interaction Design",
        slug: "interaction-design",
      },
      {
        name: "Visual Design",
        slug: "visual-design",
      },
      {
        name: "User Research",
        slug: "user-research",
      },
    ],
  },
  {
    name: "Quality Assurance",
    slug: "quality-assurance",
    color: "#3A98B9",
    subcategories: [
      {
        name: "Manual Testing",
        slug: "manual-testing",
      },
      {
        name: "Test Automation",
        slug: "test-automation",
      },
      {
        name: "Performance Testing",
        slug: "performance-testing",
      },
    ],
  },
  {
    name: "Security",
    slug: "security",
    color: "#92B4EC",
    subcategories: [
      {
        name: "Web Security",
        slug: "web-security",
      },
      {
        name: "Network Security",
        slug: "network-security",
      },
      {
        name: "Cryptography",
        slug: "cryptography",
      },
    ],
  },
  {
    name: "Project Management",
    slug: "project-management",
    color: "#E28F83",
    subcategories: [
      {
        name: "Agile Methodologies",
        slug: "agile-methodologies",
      },
      {
        name: "Tools & Processes",
        slug: "tools-processes",
      },
      {
        name: "Leadership",
        slug: "leadership",
      },
    ],
  },
];

async function seed() {
  const payload = await getPayload({ config });

  for (const category of categories) {
    const parentCategory = await payload.create({
      collection: "categories",
      data: {
        name: category.name,
        slug: category.slug,
        color: category.color,
        parent: null,
      },
    });

    for (const subCategory of category.subcategories || []) {
      await payload.create({
        collection: "categories",
        data: {
          name: subCategory.name,
          slug: subCategory.slug,
          parent: parentCategory.id,
        },
      });
    }
  }
}

try {
  await seed();
  console.log("Seed completed successfully");
  process.exit(0);
} catch (error) {
  console.error(error);
  process.exit(1);
}
