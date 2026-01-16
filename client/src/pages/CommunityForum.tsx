import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, ThumbsUp, Eye, Users, TrendingUp, Plus } from "lucide-react";
import { useState } from "react";

export default function CommunityForum() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    { id: "all", label: "All Topics", icon: "💬", count: 1240 },
    { id: "tips", label: "Tips & Tricks", icon: "💡", count: 340 },
    { id: "pricing", label: "Pricing Strategy", icon: "💰", count: 210 },
    { id: "growth", label: "Business Growth", icon: "📈", count: 180 },
    { id: "tech", label: "Technical Help", icon: "🔧", count: 290 },
    { id: "team", label: "Team Management", icon: "👥", count: 150 },
    { id: "marketing", label: "Marketing", icon: "📢", count: 120 },
  ];

  const topics = [
    {
      id: 1,
      title: "How I increased my average project size by 40% using financing",
      category: "pricing",
      author: "Lisa Rodriguez",
      avatar: "👩‍💼",
      replies: 24,
      views: 1240,
      likes: 156,
      reputation: 850,
      lastReply: "2 hours ago",
      excerpt:
        "I started offering customer financing options and my average project size jumped from $8K to $11.2K. Here's what I did...",
      tags: ["financing", "growth", "strategy"],
      featured: true,
    },
    {
      id: 2,
      title: "Best practices for managing multiple crews across different job sites",
      category: "team",
      author: "James Wilson",
      avatar: "👨‍💼",
      replies: 18,
      views: 890,
      likes: 112,
      reputation: 720,
      lastReply: "4 hours ago",
      excerpt:
        "Managing 3 crews was chaotic until I implemented these systems. Now I have full visibility and control...",
      tags: ["team", "management", "scaling"],
      featured: false,
    },
    {
      id: 3,
      title: "AI-powered invoicing saved me 12 hours per week - here's how",
      category: "tips",
      author: "Sarah Johnson",
      avatar: "👩‍🔬",
      replies: 32,
      views: 2100,
      likes: 289,
      reputation: 950,
      lastReply: "1 hour ago",
      excerpt:
        "The AI assistant generates invoice descriptions automatically. I went from 8 hours to less than 1 hour per week...",
      tags: ["ai", "efficiency", "automation"],
      featured: true,
    },
    {
      id: 4,
      title: "Seasonal pricing strategy that increased winter revenue by 35%",
      category: "pricing",
      author: "Mike Chen",
      avatar: "👨‍🏫",
      replies: 15,
      views: 650,
      likes: 98,
      reputation: 680,
      lastReply: "6 hours ago",
      excerpt:
        "Winter is usually slow for us, but this year I implemented dynamic pricing based on demand and got 35% more revenue...",
      tags: ["pricing", "seasonal", "revenue"],
      featured: false,
    },
    {
      id: 5,
      title: "Employee geofencing - worth it or not?",
      category: "tech",
      author: "Emma Davis",
      avatar: "👩‍🎨",
      replies: 28,
      views: 1560,
      likes: 201,
      reputation: 820,
      lastReply: "3 hours ago",
      excerpt:
        "I was skeptical about geofencing but it's been a game-changer. No more disputes about hours worked. Here's my honest review...",
      tags: ["geofencing", "tracking", "employees"],
      featured: true,
    },
  ];

  const filteredTopics = topics.filter(
    (topic) =>
      (selectedCategory === "all" || topic.category === selectedCategory) &&
      (topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        topic.excerpt.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const stats = [
    { label: "Active Members", value: "2,340", icon: "👥" },
    { label: "Total Topics", value: "1,240", icon: "💬" },
    { label: "Total Replies", value: "8,920", icon: "↩️" },
    { label: "Helpful Answers", value: "94%", icon: "✓" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">Contractor Community</h1>
          <p className="text-muted-foreground mt-2">
            Connect with 2,340+ contractors, share tips, and grow your business together
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          New Topic
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i}>
            <CardContent className="pt-6">
              <p className="text-2xl mb-2">{stat.icon}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search and Categories */}
      <div className="space-y-4">
        <Input
          placeholder="Search topics, tips, and discussions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="h-10"
        />

        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Button
              key={cat.id}
              variant={selectedCategory === cat.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(cat.id)}
              size="sm"
              className="gap-2"
            >
              <span>{cat.icon}</span>
              {cat.label}
              <Badge variant="secondary" className="ml-1">
                {cat.count}
              </Badge>
            </Button>
          ))}
        </div>
      </div>

      {/* Topics List */}
      <div className="space-y-3">
        {filteredTopics.map((topic) => (
          <Card
            key={topic.id}
            className={`hover:shadow-lg transition-shadow cursor-pointer ${
              topic.featured ? "border-blue-200 bg-blue-50" : ""
            }`}
          >
            <CardContent className="pt-6">
              <div className="flex gap-4">
                {/* Avatar and Author */}
                <div className="flex-shrink-0">
                  <div className="text-3xl">{topic.avatar}</div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {topic.featured && (
                          <Badge className="bg-blue-600">Featured</Badge>
                        )}
                        <p className="font-bold text-lg">{topic.title}</p>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        by <span className="font-semibold">{topic.author}</span> •{" "}
                        {topic.lastReply}
                      </p>
                      <p className="text-sm text-gray-700 mb-3">{topic.excerpt}</p>
                      <div className="flex flex-wrap gap-2">
                        {topic.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex-shrink-0 text-right space-y-2">
                      <div className="flex items-center justify-end gap-1 text-sm">
                        <MessageSquare className="h-4 w-4 text-blue-600" />
                        <span className="font-bold">{topic.replies}</span>
                      </div>
                      <div className="flex items-center justify-end gap-1 text-sm">
                        <Eye className="h-4 w-4 text-gray-600" />
                        <span>{topic.views}</span>
                      </div>
                      <div className="flex items-center justify-end gap-1 text-sm">
                        <ThumbsUp className="h-4 w-4 text-green-600" />
                        <span>{topic.likes}</span>
                      </div>
                      <div className="text-xs text-muted-foreground pt-2 border-t">
                        Rep: {topic.reputation}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* CTA */}
      <Card className="bg-gradient-to-r from-purple-600 to-purple-700 text-white border-0">
        <CardContent className="pt-6 text-center">
          <h3 className="text-xl font-bold mb-2">Join the Conversation</h3>
          <p className="mb-4 opacity-90">
            Share your tips, ask questions, and learn from 2,340+ contractors
          </p>
          <Button variant="secondary" size="lg" className="gap-2">
            <Plus className="h-4 w-4" />
            Create New Topic
          </Button>
        </CardContent>
      </Card>

      {/* Reputation System Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Reputation System
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Earn reputation points by helping others and sharing valuable insights:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3 bg-green-50 border border-green-200 rounded">
              <p className="font-bold text-sm">+10 points</p>
              <p className="text-xs text-muted-foreground">Helpful reply</p>
            </div>
            <div className="p-3 bg-blue-50 border border-blue-200 rounded">
              <p className="font-bold text-sm">+25 points</p>
              <p className="text-xs text-muted-foreground">Accepted answer</p>
            </div>
            <div className="p-3 bg-purple-50 border border-purple-200 rounded">
              <p className="font-bold text-sm">+50 points</p>
              <p className="text-xs text-muted-foreground">Featured topic</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
