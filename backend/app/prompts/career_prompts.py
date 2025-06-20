class CareerPrompts:
    @staticmethod
    def skills_gap_analysis(current_skills: List[str], target_role: str) -> str:
        return f"""
        <skills_analysis>
        <current_skills>{', '.join(current_skills)}</current_skills>
        <target_role>{target_role}</target_role>
        
        Analyze the skills gap between current capabilities and target role requirements:
        
        1. Skills alignment: Which current skills transfer directly?
        2. Missing critical skills: What are the top 3 priority skills to develop?
        3. Learning pathway: Suggest specific courses, certifications, or projects
        4. Timeline: Realistic timeframe for skill development
        5. Alternative paths: Are there intermediate roles that bridge the gap?
        
        Provide specific, actionable recommendations with resource links where possible.
        </skills_analysis>
        """
    
    @staticmethod
    def resume_enhancement(resume_text: str, target_role: str) -> str:
        return f"""
        <resume_analysis>
        <resume_content>{resume_text}</resume_content>
        <target_role>{target_role}</target_role>
        
        Provide comprehensive resume feedback:
        
        1. ATS Optimization Score (1-10) with specific improvements
        2. Impact Statement Enhancement: Rewrite 3 bullet points with quantifiable metrics
        3. Keyword Optimization: Add relevant industry keywords
        4. Structure Improvements: Format and organization suggestions
        5. Skills Section: Recommend additions/reorganization
        6. Achievement Highlighting: Identify underutilized accomplishments
        
        Provide before/after examples for key improvements.
        </resume_analysis>
        """