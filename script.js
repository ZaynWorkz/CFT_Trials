// ==========================================================================
// CTF Algorithm - Interactive Reference Guide
// ==========================================================================

// Content templates for each tab
const contentTemplates = {
    overview: `
        <div class="section">
            <div class="section-title">
                <i class="fas fa-chart-line"></i> Quick Reference
            </div>
            <div class="card-grid">
                <div class="card">
                    <div class="card-title"><i class="fas fa-bolt"></i> Signal Scores</div>
                    <div class="card-content">
                        <div><span class="variable-name">DLI</span> <span class="variable-desc">= 1 - (t/t_max)</span></div>
                        <div><span class="variable-name">CMS</span> <span class="variable-desc">= 1 - weight(error)</span></div>
                        <div><span class="variable-name">ADRC</span> <span class="variable-desc">= weighted mean(correct_rate)</span></div>
                        <div><span class="variable-name">CED</span> <span class="variable-desc">= (attempts × time) clamped [0.5,1]</span></div>
                        <div><span class="variable-name">LVC</span> <span class="variable-desc">= (CMS_prev - CMS_curr)/count</span></div>
                    </div>
                </div>
                <div class="card">
                    <div class="card-title"><i class="fas fa-weight"></i> BWV Weights</div>
                    <div class="card-content">
                        <div><span class="badge badge-blue">w₁ = 0.20 (DLI)</span></div>
                        <div><span class="badge badge-green">w₂ = 0.30 (CMS)</span></div>
                        <div><span class="badge badge-red">w₃ = 0.20 (ADRC)</span></div>
                        <div><span class="badge badge-purple">w₄ = 0.30 (CED)</span></div>
                        <div><span class="badge badge-blue">w₅ = 0.25 (LVC)</span></div>
                    </div>
                </div>
                <div class="card">
                    <div class="card-title"><i class="fas fa-calculator"></i> Core Formula</div>
                    <div class="card-content">
                        <div style="font-family: monospace; font-size: 14px; background: white; padding: 15px; border-radius: 8px;">
                            BWV = (w₁×DLI) × (w₂×CMS) × (w₃×ADRC) × (w₄×CED) × (1 + w₅×LVC)
                        </div>
                    </div>
                </div>
                <div class="card">
                    <div class="card-title"><i class="fas fa-trophy"></i> Final Scores</div>
                    <div class="card-content">
                        <div><span class="variable-name">AppScore</span> - Tournament (0-100)</div>
                        <div><span class="variable-name">H-Score</span> - Matchmaking (0-100)</div>
                        <div><span class="variable-name">G_norm</span> - Normalized Mt</div>
                        <div><span class="variable-name">θ_norm</span> - Normalized theta</div>
                    </div>
                </div>
            </div>
            
            <div class="note-box">
                <div class="note-box-title"><i class="fas fa-lightbulb"></i> Key Insight</div>
                <p style="font-size: 16px;">The algorithm fuses <strong>5 cognitive signals</strong> through <strong>5 behavioral weights</strong> to produce a unified trajectory score. Error patterns matter more than just correctness.</p>
            </div>
        </div>
    `,

    signals: `
        <div class="section">
            <div class="section-title">
                <i class="fas fa-satellite-dish"></i> Signal Scores
            </div>
            
            <div class="two-col">
                <div>
                    <div class="subsection-title"><i class="fas fa-clock"></i> DLI_score</div>
                    <div class="formula-block">
                        <div class="formula">DLI = 1 - (t_response / t_max)</div>
                        <div class="formula-desc">Range: 0.0 to 1.0 • Response speed index</div>
                    </div>
                    
                    <div class="subsection-title"><i class="fas fa-brain"></i> CMS_score</div>
                    <div class="formula-block">
                        <div class="formula">CMS = 1 - CMS_weight[error_category]</div>
                        <div class="formula-desc">Range: 0.0 to 1.0 • Error type severity</div>
                    </div>
                    
                    <div class="subsection-title"><i class="fas fa-chart-bar"></i> ADRC_score</div>
                    <div class="formula-block">
                        <div class="formula">ADRC = 0.2R_easy + 0.4R_medium + 0.4R_hard</div>
                        <div class="formula-desc">Difficulty adaptation score</div>
                    </div>
                </div>
                
                <div>
                    <div class="subsection-title"><i class="fas fa-fire"></i> CED_score</div>
                    <div class="formula-block">
                        <div class="formula">CED = (non_guess/total) × (avg_time_ratio)</div>
                        <div class="formula-desc">Clamped [0.5, 1.0] • Engagement level</div>
                    </div>
                    
                    <div class="subsection-title"><i class="fas fa-rocket"></i> LVC_score</div>
                    <div class="formula-block">
                        <div class="formula">LVC = (CMS_prev - CMS_curr) / quiz_count</div>
                        <div class="formula-desc">Range: -1.0 to +1.0 • Learning velocity</div>
                    </div>
                </div>
            </div>
            
            <div class="subsection-title"><i class="fas fa-exclamation-triangle"></i> CMS Error Categories</div>
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Category</th>
                            <th>Weight</th>
                            <th>CMS_score</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>concept_gap</td><td>1.0</td><td>0.0</td><td>Fundamental concept missing</td></tr>
                        <tr><td>concept_confusion</td><td>0.8</td><td>0.2</td><td>Mixing up related concepts</td></tr>
                        <tr><td>overgeneralization</td><td>0.6</td><td>0.4</td><td>Applying rule too broadly</td></tr>
                        <tr><td>qualifier_blindness</td><td>0.5</td><td>0.5</td><td>Missing important conditions</td></tr>
                        <tr><td>false_intuition</td><td>0.4</td><td>0.6</td><td>Confident but wrong intuition</td></tr>
                        <tr><td>surface_recall</td><td>0.3</td><td>0.7</td><td>Memorized but didn't understand</td></tr>
                        <tr><td>none</td><td>0.0</td><td>1.0</td><td>Correct answer</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
    `,

    bwv: `
        <div class="section">
            <div class="section-title">
                <i class="fas fa-weight-hanging"></i> Behavioral Weight Vector
            </div>
            
            <div class="formula-block" style="background: #e7f1ff;">
                <div class="formula" style="font-size: 20px;">BWV = (w₁×DLI) × (w₂×CMS) × (w₃×ADRC) × (w₄×CED) × (1 + w₅×LVC)</div>
            </div>
            
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Weight</th>
                            <th>Value</th>
                            <th>Component</th>
                            <th>Rationale</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>w₁</td><td>0.20</td><td>DLI</td><td>Speed matters but not everything</td></tr>
                        <tr><td>w₂</td><td>0.30</td><td>CMS</td><td>Error type is highly diagnostic</td></tr>
                        <tr><td>w₃</td><td>0.20</td><td>ADRC</td><td>Consistency across difficulties</td></tr>
                        <tr><td>w₄</td><td>0.30</td><td>CED</td><td>Effort and engagement matter</td></tr>
                        <tr><td>w₅</td><td>0.25</td><td>LVC</td><td>Improvement gets bonus</td></tr>
                    </tbody>
                </table>
            </div>
            
            <div class="note-box">
                <div class="note-box-title"><i class="fas fa-calculator"></i> BWV Properties</div>
                <ul style="margin-left: 20px;">
                    <li>Multiplicative combination (not additive)</li>
                    <li>LVC acts as amplifier: (1 + 0.25×LVC)</li>
                    <li>Range: Typically 0.0 to ~0.5</li>
                    <li>Higher BWV = More reliable performance signal</li>
                </ul>
            </div>
        </div>
    `,

    irt: `
        <div class="section">
            <div class="section-title">
                <i class="fas fa-chart-line"></i> IRT θ* Update
            </div>
            
            <div class="formula-block">
                <div class="formula">s_i_eff = s_i × (1 - 0.4 × CMS_weight)</div>
                <div class="formula">P_i = 1 / (1 + exp(-s_i_eff × (θ - χ_i)))</div>
                <div class="formula">Q_i = actual_i × BWV</div>
                <div class="formula">θ_new = θ + 0.15 × (Q_i - P_i)</div>
                <div class="formula">χ_new = χ - 8 × (actual_i - P_i) × ADRC</div>
            </div>
            
            <div class="two-col">
                <div>
                    <div class="subsection-title"><i class="fas fa-cog"></i> Parameters</div>
                    <table>
                        <tr><td><span class="variable-name">θ</span></td><td>Ability score (-3 to +3)</td></tr>
                        <tr><td><span class="variable-name">χ_i</span></td><td>Item difficulty (-2 to +2)</td></tr>
                        <tr><td><span class="variable-name">s_i</span></td><td>Discrimination (default 1.0)</td></tr>
                        <tr><td><span class="variable-name">α</span></td><td>Learning rate = 0.15</td></tr>
                        <tr><td><span class="variable-name">K_item</span></td><td>Item update rate = 8.0</td></tr>
                    </table>
                </div>
                
                <div>
                    <div class="subsection-title"><i class="fas fa-sync"></i> Update Logic</div>
                    <ul style="margin-left: 20px;">
                        <li>Correct answer (Q_i ≈ 1) → θ increases</li>
                        <li>Wrong answer (Q_i ≈ 0) → θ decreases</li>
                        <li>BWV modulates update magnitude</li>
                        <li>CMS_weight reduces discrimination for errors</li>
                        <li>ADRC amplifies item difficulty updates</li>
                    </ul>
                </div>
            </div>
        </div>
    `,

    glicko: `
        <div class="section">
            <div class="section-title">
                <i class="fas fa-star"></i> Glicko G* Update
            </div>
            
            <div class="formula-block">
                <div class="formula">φ_hat² = min(3.0, φ² + Δt × Vt²)</div>
                <div class="formula">g_φ = 1 / √(1 + 3φ_hat²/π²)</div>
                <div class="formula">E_i = 1 / (1 + exp(-g_φ × (Mt - χ_i)))</div>
                <div class="formula">K = 24 × (1 + 0.25 × LVC)</div>
                <div class="formula">Mt_new = Mt + K × mean(actual_i - E_i) × mean(BWV)</div>
                <div class="formula">I = mean(g_φ² × E_i × (1 - E_i))</div>
                <div class="formula">φ²_new = min(3.0, 1/(1/φ_hat² + I))</div>
                <div class="formula">Vt_new = clamp(Vt × (1 + 0.1×CMS_weight - 0.05×LVC), 0.3, 1.2)</div>
            </div>
            
            <div class="card-grid">
                <div class="card">
                    <div class="card-title"><i class="fas fa-arrows-alt"></i> Ranges</div>
                    <div>Mt: 1000-2000</div>
                    <div>φ²: 0-3.0</div>
                    <div>Vt: 0.3-1.2</div>
                    <div>K: 18-30 (dynamic)</div>
                </div>
                
                <div class="card">
                    <div class="card-title"><i class="fas fa-clock"></i> Time Drift</div>
                    <div>Δt = days since last session</div>
                    <div>Uncertainty increases with time</div>
                    <div>Volatility amplifies drift</div>
                </div>
            </div>
        </div>
    `,

    modes: `
        <div class="section">
            <div class="section-title">
                <i class="fas fa-code-branch"></i> Tournament vs Matchmaking
            </div>
            
            <div class="two-col">
                <div class="card border-tournament">
                    <div class="card-title" style="color: #0066CC;">🏆 TOURNAMENT MODE</div>
                    <div class="quick-ref-item"><span class="quick-ref-var">Updates:</span> <span class="quick-ref-desc">G*, θ*, AppScore (permanent)</span></div>
                    <div class="quick-ref-item"><span class="quick-ref-var">Constants:</span> <span class="quick-ref-desc">α=0.15, K_base=24</span></div>
                    <div class="quick-ref-item"><span class="quick-ref-var">Output:</span> <span class="quick-ref-desc">AppScore (0-100)</span></div>
                    <div class="formula-block" style="margin: 15px 0;">
                        <div class="formula">λ = 0.6 if sessions < 5 else 0.4</div>
                        <div class="formula">G_norm = (Mt-1000)/10</div>
                        <div class="formula">θ_norm = (θ+3)/6 × 100</div>
                        <div class="formula">Base = G_norm^λ × θ_norm^(1-λ)</div>
                        <div class="formula">AppScore = Base × CED × (1 + max(0, LVC×0.15))</div>
                    </div>
                </div>
                
                <div class="card border-matchmaking">
                    <div class="card-title" style="color: #28a745;">🤝 MATCHMAKING MODE</div>
                    <div class="quick-ref-item"><span class="quick-ref-var">Updates:</span> <span class="quick-ref-desc">Only H-Score (G/θ discarded)</span></div>
                    <div class="quick-ref-item"><span class="quick-ref-var">Constants:</span> <span class="quick-ref-desc">α_s=0.195, K_s=36</span></div>
                    <div class="quick-ref-item"><span class="quick-ref-var">Output:</span> <span class="quick-ref-desc">H-Score (0-100)</span></div>
                    
                    <div class="subsection-title" style="font-size: 18px; margin: 15px 0;">H-Score Components</div>
                    <table style="font-size: 13px;">
                        <tr><td>CCR</td><td>concepts_corrected / max(1, wrong_at_start)</td><td>0.35</td></tr>
                        <tr><td>DPI</td><td>mean(χ_i) / 2.0</td><td>0.25</td></tr>
                        <tr><td>SES</td><td>running_mean(CED)</td><td>0.20</td></tr>
                        <tr><td>CI</td><td>1 - std_dev(normalized scores)</td><td>0.20</td></tr>
                    </table>
                    
                    <div class="formula-block" style="margin: 15px 0;">
                        <div class="formula">H_base = 0.35CCR + 0.25DPI + 0.20SES + 0.20CI</div>
                        <div class="formula">H_bonus = max(0, LVC × 0.20)</div>
                        <div class="formula">H_Score = H_base × (1 + H_bonus) × 100</div>
                    </div>
                </div>
            </div>
        </div>
    `,

    reference: `
        <div class="section">
            <div class="section-title">
                <i class="fas fa-book"></i> Complete Reference
            </div>
            
            <div class="card-grid">
                <div class="card">
                    <div class="card-title"><i class="fas fa-user"></i> Learner Profile</div>
                    <div class="card-content">
                        <div><span class="variable-name">Mt</span> 1500-2000 - Strength</div>
                        <div><span class="variable-name">phi_sq</span> 0-3.0 - Uncertainty</div>
                        <div><span class="variable-name">Vt</span> 0.3-1.2 - Volatility</div>
                        <div><span class="variable-name">theta</span> -3 to +3 - Ability</div>
                        <div><span class="variable-name">session_count</span> # sessions</div>
                        <div><span class="variable-name">LVC_score</span> -1 to +1</div>
                    </div>
                </div>
                
                <div class="card">
                    <div class="card-title"><i class="fas fa-flask"></i> Test Cases</div>
                    <div class="card-content">
                        <div><span class="badge badge-blue">TC-01</span> Fast-Correct → AppScore >65</div>
                        <div><span class="badge badge-blue">TC-02</span> Slow-Correct → Mild rise</div>
                        <div><span class="badge badge-blue">TC-03</span> Fast-Wrong → Sharp drop</div>
                        <div><span class="badge badge-blue">TC-04</span> Concept Gap → Vt ceiling</div>
                        <div><span class="badge badge-green">TC-05</span> Sandbox → Profile unchanged</div>
                        <div><span class="badge badge-green">TC-06</span> Rapid Correction → H-Score up</div>
                    </div>
                </div>
                
                <div class="card">
                    <div class="card-title"><i class="fas fa-memory"></i> Memory Aid</div>
                    <div class="card-content">
                        <p><strong>D</strong>ecision Latency (DLI)</p>
                        <p><strong>C</strong>ognitive Mistake (CMS)</p>
                        <p><strong>A</strong>daptive Difficulty (ADRC)</p>
                        <p><strong>C</strong>ognitive Engagement (CED)</p>
                        <p><strong>L</strong>earning Velocity (LVC)</p>
                        <p style="margin-top: 10px;">→ <strong>BWV</strong> fuses all five</p>
                    </div>
                </div>
            </div>
            
            <div class="note-box">
                <div class="note-box
