import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Eye, 
  Save, 
  Plus,
  Trash2,
  Star,
  AlertCircle
} from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Modal from '../ui/Modal';
import { ResumeContent, PersonalInfo, WorkExperience, Education } from '../../types';
import { calculateATSScore } from '../../lib/utils';

const ResumeBuilder: React.FC = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [showPreview, setShowPreview] = useState(false);
  const [resumeContent, setResumeContent] = useState<ResumeContent>({
    personal_info: {
      full_name: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      portfolio: ''
    },
    summary: '',
    experience: [],
    education: [],
    skills: [],
    certifications: [],
    projects: []
  });

  const tabs = [
    { id: 'personal', name: 'Personal Info', icon: FileText },
    { id: 'summary', name: 'Summary', icon: FileText },
    { id: 'experience', name: 'Experience', icon: FileText },
    { id: 'education', name: 'Education', icon: FileText },
    { id: 'skills', name: 'Skills', icon: FileText },
    { id: 'projects', name: 'Projects', icon: FileText }
  ];

  const atsScore = calculateATSScore(resumeContent);

  const updatePersonalInfo = (field: keyof PersonalInfo, value: string) => {
    setResumeContent(prev => ({
      ...prev,
      personal_info: {
        ...prev.personal_info,
        [field]: value
      }
    }));
  };

  const addExperience = () => {
    const newExperience: WorkExperience = {
      id: Math.random().toString(36).substr(2, 9),
      company: '',
      position: '',
      location: '',
      start_date: '',
      end_date: '',
      current: false,
      description: '',
      achievements: []
    };
    setResumeContent(prev => ({
      ...prev,
      experience: [...prev.experience, newExperience]
    }));
  };

  const updateExperience = (id: string, field: keyof WorkExperience, value: any) => {
    setResumeContent(prev => ({
      ...prev,
      experience: prev.experience.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const removeExperience = (id: string) => {
    setResumeContent(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }));
  };

  const addEducation = () => {
    const newEducation: Education = {
      id: Math.random().toString(36).substr(2, 9),
      institution: '',
      degree: '',
      field_of_study: '',
      start_date: '',
      end_date: '',
      gpa: undefined,
      description: ''
    };
    setResumeContent(prev => ({
      ...prev,
      education: [...prev.education, newEducation]
    }));
  };

  const updateEducation = (id: string, field: keyof Education, value: any) => {
    setResumeContent(prev => ({
      ...prev,
      education: prev.education.map(edu => 
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const removeEducation = (id: string) => {
    setResumeContent(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  };

  const addSkill = (skill: string) => {
    if (skill && !resumeContent.skills.includes(skill)) {
      setResumeContent(prev => ({
        ...prev,
        skills: [...prev.skills, skill]
      }));
    }
  };

  const removeSkill = (skill: string) => {
    setResumeContent(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };

  const renderPersonalInfo = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Full Name"
          value={resumeContent.personal_info.full_name}
          onChange={(e) => updatePersonalInfo('full_name', e.target.value)}
          placeholder="John Doe"
        />
        <Input
          label="Email"
          type="email"
          value={resumeContent.personal_info.email}
          onChange={(e) => updatePersonalInfo('email', e.target.value)}
          placeholder="john@example.com"
        />
        <Input
          label="Phone"
          value={resumeContent.personal_info.phone}
          onChange={(e) => updatePersonalInfo('phone', e.target.value)}
          placeholder="+1 (555) 123-4567"
        />
        <Input
          label="Location"
          value={resumeContent.personal_info.location}
          onChange={(e) => updatePersonalInfo('location', e.target.value)}
          placeholder="San Francisco, CA"
        />
        <Input
          label="LinkedIn"
          value={resumeContent.personal_info.linkedin}
          onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
          placeholder="linkedin.com/in/johndoe"
        />
        <Input
          label="Portfolio"
          value={resumeContent.personal_info.portfolio}
          onChange={(e) => updatePersonalInfo('portfolio', e.target.value)}
          placeholder="johndoe.dev"
        />
      </div>
    </div>
  );

  const renderSummary = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Professional Summary
        </label>
        <textarea
          rows={6}
          value={resumeContent.summary}
          onChange={(e) => setResumeContent(prev => ({ ...prev, summary: e.target.value }))}
          placeholder="Write a compelling summary that highlights your key achievements and career objectives..."
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
        <p className="text-sm text-gray-500 mt-2">
          Tip: Keep it concise (2-3 sentences) and focus on your unique value proposition.
        </p>
      </div>
    </div>
  );

  const renderExperience = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Work Experience</h3>
        <Button onClick={addExperience} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Experience
        </Button>
      </div>
      
      {resumeContent.experience.map((exp, index) => (
        <Card key={exp.id} className="relative">
          <button
            onClick={() => removeExperience(exp.id)}
            className="absolute top-4 right-4 p-1 text-red-500 hover:bg-red-50 rounded"
          >
            <Trash2 className="h-4 w-4" />
          </button>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Company"
                value={exp.company}
                onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                placeholder="Company Name"
              />
              <Input
                label="Position"
                value={exp.position}
                onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                placeholder="Job Title"
              />
              <Input
                label="Location"
                value={exp.location || ''}
                onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                placeholder="City, State"
              />
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={exp.current}
                  onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <label className="text-sm text-gray-700">Current Position</label>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Start Date"
                type="month"
                value={exp.start_date}
                onChange={(e) => updateExperience(exp.id, 'start_date', e.target.value)}
              />
              {!exp.current && (
                <Input
                  label="End Date"
                  type="month"
                  value={exp.end_date || ''}
                  onChange={(e) => updateExperience(exp.id, 'end_date', e.target.value)}
                />
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                rows={4}
                value={exp.description}
                onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                placeholder="Describe your responsibilities and achievements..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
        </Card>
      ))}
      
      {resumeContent.experience.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <p>No work experience added yet</p>
          <Button onClick={addExperience} className="mt-4">
            Add Your First Experience
          </Button>
        </div>
      )}
    </div>
  );

  const renderEducation = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Education</h3>
        <Button onClick={addEducation} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Education
        </Button>
      </div>
      
      {resumeContent.education.map((edu) => (
        <Card key={edu.id} className="relative">
          <button
            onClick={() => removeEducation(edu.id)}
            className="absolute top-4 right-4 p-1 text-red-500 hover:bg-red-50 rounded"
          >
            <Trash2 className="h-4 w-4" />
          </button>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Institution"
                value={edu.institution}
                onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                placeholder="University Name"
              />
              <Input
                label="Degree"
                value={edu.degree}
                onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                placeholder="Bachelor of Science"
              />
              <Input
                label="Field of Study"
                value={edu.field_of_study}
                onChange={(e) => updateEducation(edu.id, 'field_of_study', e.target.value)}
                placeholder="Computer Science"
              />
              <Input
                label="GPA (Optional)"
                type="number"
                step="0.01"
                min="0"
                max="4"
                value={edu.gpa || ''}
                onChange={(e) => updateEducation(edu.id, 'gpa', parseFloat(e.target.value) || undefined)}
                placeholder="3.8"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Start Date"
                type="month"
                value={edu.start_date}
                onChange={(e) => updateEducation(edu.id, 'start_date', e.target.value)}
              />
              <Input
                label="End Date"
                type="month"
                value={edu.end_date || ''}
                onChange={(e) => updateEducation(edu.id, 'end_date', e.target.value)}
              />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  const renderSkills = () => {
    const [newSkill, setNewSkill] = useState('');
    
    return (
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Add Skills
          </label>
          <div className="flex space-x-2">
            <Input
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="e.g., JavaScript, Project Management"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addSkill(newSkill);
                  setNewSkill('');
                }
              }}
            />
            <Button 
              onClick={() => {
                addSkill(newSkill);
                setNewSkill('');
              }}
              disabled={!newSkill.trim()}
            >
              Add
            </Button>
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Your Skills</h4>
          <div className="flex flex-wrap gap-2">
            {resumeContent.skills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 text-primary-800"
              >
                {skill}
                <button
                  onClick={() => removeSkill(skill)}
                  className="ml-2 text-primary-600 hover:text-primary-800"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          {resumeContent.skills.length === 0 && (
            <p className="text-gray-500 text-sm">No skills added yet</p>
          )}
        </div>
      </div>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'personal':
        return renderPersonalInfo();
      case 'summary':
        return renderSummary();
      case 'experience':
        return renderExperience();
      case 'education':
        return renderEducation();
      case 'skills':
        return renderSkills();
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Resume Builder</h1>
          <p className="text-gray-600 mt-2">Create a professional resume that stands out</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${atsScore >= 80 ? 'bg-green-500' : atsScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
            <span className="text-sm font-medium">ATS Score: {atsScore}%</span>
          </div>
          <Button variant="outline" onClick={() => setShowPreview(true)}>
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
        </div>
      </div>

      {/* ATS Score Card */}
      <Card>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
              atsScore >= 80 ? 'bg-green-100' : atsScore >= 60 ? 'bg-yellow-100' : 'bg-red-100'
            }`}>
              <span className={`text-2xl font-bold ${
                atsScore >= 80 ? 'text-green-600' : atsScore >= 60 ? 'text-yellow-600' : 'text-red-600'
              }`}>
                {atsScore}
              </span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">ATS Compatibility Score</h3>
              <p className="text-gray-600">
                {atsScore >= 80 ? 'Excellent! Your resume is highly ATS-friendly.' :
                 atsScore >= 60 ? 'Good, but there\'s room for improvement.' :
                 'Needs improvement to pass ATS screening.'}
              </p>
            </div>
          </div>
          {atsScore < 80 && (
            <div className="flex items-center text-orange-600">
              <AlertCircle className="h-5 w-5 mr-2" />
              <span className="text-sm">Optimization needed</span>
            </div>
          )}
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <Card padding="sm">
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <tab.icon className="h-4 w-4 mr-3" />
                  {tab.name}
                </button>
              ))}
            </nav>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <Card>
            {renderTabContent()}
          </Card>
        </div>
      </div>

      {/* Preview Modal */}
      <Modal
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        title="Resume Preview"
        size="xl"
      >
        <div className="bg-white p-8 shadow-lg">
          {/* Resume Preview Content */}
          <div className="space-y-6">
            {/* Header */}
            <div className="text-center border-b pb-6">
              <h1 className="text-3xl font-bold text-gray-900">
                {resumeContent.personal_info.full_name || 'Your Name'}
              </h1>
              <div className="flex justify-center space-x-4 mt-2 text-gray-600">
                <span>{resumeContent.personal_info.email}</span>
                <span>{resumeContent.personal_info.phone}</span>
                <span>{resumeContent.personal_info.location}</span>
              </div>
            </div>

            {/* Summary */}
            {resumeContent.summary && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Professional Summary</h2>
                <p className="text-gray-700">{resumeContent.summary}</p>
              </div>
            )}

            {/* Experience */}
            {resumeContent.experience.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Work Experience</h2>
                <div className="space-y-4">
                  {resumeContent.experience.map((exp) => (
                    <div key={exp.id}>
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                          <p className="text-gray-700">{exp.company}</p>
                        </div>
                        <span className="text-gray-500 text-sm">
                          {exp.start_date} - {exp.current ? 'Present' : exp.end_date}
                        </span>
                      </div>
                      {exp.description && (
                        <p className="text-gray-700 mt-2">{exp.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {resumeContent.education.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Education</h2>
                <div className="space-y-3">
                  {resumeContent.education.map((edu) => (
                    <div key={edu.id} className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                        <p className="text-gray-700">{edu.institution}</p>
                        <p className="text-gray-600">{edu.field_of_study}</p>
                      </div>
                      <span className="text-gray-500 text-sm">
                        {edu.start_date} - {edu.end_date}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Skills */}
            {resumeContent.skills.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {resumeContent.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ResumeBuilder;