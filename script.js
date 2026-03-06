// ==========================================================================
// CTF Algorithm - Official Testing Script
// Complete implementation with working tabs and all cheat codes
// ==========================================================================

// Content database
const contentDB = {
    overview: `
        <div class="section">
            <div class="section-title">
                <i class="fas fa-chart-pie"></i> CTF Algorithm Overview
            </div>
            
            <div class="card-grid">
                <div class="card">
                    <div class="card-title"><i class="fas fa-bolt"></i> Core Components</div>
                    <div class="card-content">
                        <div><span class="variable-name">DLI</span> Decision Latency Index</div>
                        <div><span class="variable-name">CMS</span> Cognitive Mistake Signature</div>
                        <div><span class="variable-name">ADRC</span> Adaptive Difficulty Response</div>
                        <div><span class="variable-name">CED</span> Cognitive Engagement Density</div>
                        <div><span class="variable-name">LVC</span> Learning Velocity Coefficient</div>
                    </div>
                </div>
                
                <div class="card">
                    <div class="card-title"><i class="fas fa-weight-scale"></i> BWV Weights</div>
                    <div class="card-content">
                        <div><span class="badge badge-primary">w₁ = 0.20</span> DLI</div>
                        <div><span class="badge badge-success">w₂ = 0.30</span> CMS</div>
                        <div><span class="badge badge-danger">w₃ = 0.20</span> ADRC</div>
                        <div><span class="badge badge-warning">w₄ = 0.30</span> CED</div>
                        <div><span class="badge badge-primary">w₅ = 0.25</span> LVC (amplifier)</div>
                    </div>
                </div>
                
                <div class="card">
                    <div class="card-title"><i class="fas fa-calculator"></i> BWV Formula</div>
                    <div class="card-content">
                        <code style="font-size: 14px; padding: 15px; display: block;">
BWV = (w₁×DLI) × (w₂×CMS) × (w₃×ADRC) × (w₄×CED) × (1 + w₅×LVC)
                        </code>
                    </div>
                </div>
                
                <div class="card">
                    <div class="card-title"><i class="fas fa-trophy"></i> Final Scores</div>
                    <div class="card-content">
                        <div><span class="variable-name">AppScore</span> Tournament Mode (0-100)</div>
                        <div><span class="variable-name">H-Score</span> Matchmaking Mode (0-100)</div>
                        <div><span class="variable-name">G_norm</span> Normalized Mt (0-100)</div>
                        <div><span class="variable-name">θ_norm</span> Normalized Theta (0-100)</div>
                    </div>
                </div>
            </div>

            <div class="note-box">
                <div class="note-box-title"><i class="fas fa-lightbulb"></i> Key Concept</div>
                <p>The CTF algorithm fuses 5 cognitive signals through behavioral weights to track learner trajectory. Error patterns are weighted more heavily than speed or correctness alone.</p>
                <p style="margin-top: 10px;"><strong>Range Summary:</strong> Mt: 1000-2000 | θ: -3 to +3 | φ²: 0-3.0 | Vt: 0.3-1.2</p>
            </div>
        </div>
    `,

    signals: `
        <div class="section">
            <div class="section-title">
                <i class="fas fa-satellite"></i> Signal Scores
            </div>
            
            <div class="two-col">
                <div>
                    <div class="subsection-title"><i class="fas fa-clock"></i> DLI_score</div>
                    <div class="formula-block">
                        <div class="formula">DLI = 1 - (t_response / t_max)</div>
                        <div class="formula-desc">Range: [0.0, 1.0] • Measures response speed</div>
                    </div>
                    
                    <div class="subsection-title"><i class="fas fa-brain"></i> CMS_score</div>
                    <div class="formula-block">
                        <div class="formula">CMS = 1 - CMS_weight[error_category]</div>
                        <div class="formula-desc">Range: [0.0, 1.0] • Error severity score</div>
                    </div>
                    
                    <div class="subsection-title"><i class="fas fa-chart-bar"></i> ADRC_score</div>
                    <div class="formula-block">
                        <div class="formula">ADRC = 0.2R_easy + 0.4R_medium + 0.4R_hard</div>
                        <div class="formula-desc">Weighted performance across difficulties</div>
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
                        <div class="formula-desc">Range: [-1.0, +1.0] • Learning velocity</div>
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
                        <tr><td><code>concept_gap</code></td><td>1.0</td><td>0.0</td><td>Fundamental concept missing</td></tr>
                        <tr><td><code>concept_confusion</code></td><td>0.8</td><td>0.2</td><td>Mixing up related concepts</td></tr>
                        <tr><td><code>overgeneralization</code></td><td>0.6</td><td>0.4</td><td>Applying rule too broadly</td></tr>
                        <tr><td><code>qualifier_blindness</code></td><td>0.5</td><td>0.5</td><td>Missing important conditions</td></tr>
                        <tr><td><code>false_intuition</code></td><td>0.4</td><td>0.6</td><td>Confident but wrong intuition</td></tr>
                        <tr><td><code>surface_recall</code></td><td>0.3</td><td>0.7</td><td>Memorized without understanding</td></tr>
                        <tr><td><code>none</code></td><td>0.0</td><td>1.0</td><td>Correct answer</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
    `,

    bwv: `
        <div class="section">
            <div class="section-title">
                <i class="fas fa-weight-scale"></i> Behavioral Weight Vector
            </div>
            
            <div class="formula-block" style="background: var(--primary-light);">
                <div class="formula" style="font-size: 20px;">BWV = (w₁×DLI) × (w₂×CMS) × (w₃×ADRC) × (w₄×CED) × (1 + w₅×LVC)</div>
            </div>
            
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Weight</th>
                            <th>Value</th>
                            <th>Component</th>
                            <th>Function</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>w₁</td><td>0.20</td><td>DLI</td><td>Speed modulation</td></tr>
                        <tr><td>w₂</td><td>0.30</td><td>CMS</td><td>Error severity (highest weight)</td></tr>
                        <tr><td>w₃</td><td>0.20</td><td>ADRC</td><td>Difficulty adaptation</td></tr>
                        <tr><td>w₄</td><td>0.30</td><td>CED</td><td>Engagement level</td></tr>
                        <tr><td>w₅</td><td>0.25</td><td>LVC</td><td>Improvement amplifier</td></tr>
                    </tbody>
                </table>
            </div>
            
            <div class="note-box">
                <div class="note-box-title"><i class="fas fa-chart-line"></i> BWV Properties</div>
                <ul style="margin-left: 20px;">
                    <li><strong>Range:</strong> Typically 0.0 to 0.5</li>
                    <li><strong>Multiplicative:</strong> All components multiply (not add)</li>
                    <li><strong>LVC Effect:</strong> Acts as multiplier: (1 + 0.25×LVC)</li>
                    <li><strong>Interpretation:</strong> Higher BWV = More reliable performance</li>
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
                    <div class="subsection-title"><i class="fas fa-sync"></i> Update Rules</div>
                    <ul style="margin-left: 20px;">
                        <li>Correct (Q_i≈1) → θ increases</li>
                        <li>Wrong (Q_i≈0) → θ decreases</li>
                        <li>BWV modulates update magnitude</li>
                        <li>CMS_weight reduces discrimination</li>
                        <li>ADRC amplifies difficulty updates</li>
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
                    <div class="card-title"><i class="fas fa-arrows-alt"></i> Valid Ranges</div>
                    <div><span class="variable-name">Mt</span> 1000 - 2000</div>
                    <div><span class="variable-name">φ²</span> 0.0 - 3.0</div>
                    <div><span class="variable-name">Vt</span> 0.3 - 1.2</div>
                    <div><span class="variable-name">K</span> 18 - 30 (dynamic)</div>
                </div>
                
                <div class="card">
                    <div class="card-title"><i class="fas fa-clock"></i> Time Decay</div>
                    <div><span class="variable-name">Δt</span> = days since last session</div>
                    <div>Uncertainty increases with time</div>
                    <div>Volatility amplifies drift</div>
                    <div>φ_hat² capped at 3.0</div>
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
                <div class="card" style="border-left: 4px solid var(--primary);">
                    <div class="card-title" style="color: var(--primary);">🏆 TOURNAMENT MODE</div>
                    <div class="quick-ref-item"><span class="quick-ref-var">Updates:</span> G*, θ*, AppScore (permanent)</div>
                    <div class="quick-ref-item"><span class="quick-ref-var">Constants:</span> α=0.15, K_base=24</div>
                    <div class="quick-ref-item"><span class="quick-ref-var">Output:</span> AppScore (0-100)</div>
                    
                    <div class="subsection-title" style="font-size: 18px;">AppScore Formula</div>
                    <div class="formula-block" style="margin: 10px 0;">
                        <div class="formula">λ = 0.6 (sessions < 5) else 0.4</div>
                        <div class="formula">G_norm = (Mt - 1000) / 10</div>
                        <div class="formula">θ_norm = ((θ + 3) / 6) × 100</div>
                        <div class="formula">Base = G_norm^λ × θ_norm^(1-λ)</div>
                        <div class="formula">AppScore = Base × CED × (1 + max(0, LVC×0.15))</div>
                    </div>
                </div>
                
                <div class="card" style="border-left: 4px solid var(--secondary);">
                    <div class="card-title" style="color: var(--secondary);">🤝 MATCHMAKING MODE</div>
                    <div class="quick-ref-item"><span class="quick-ref-var">Updates:</span> Only H-Score (G/θ discarded)</div>
                    <div class="quick-ref-item"><span class="quick-ref-var">Constants:</span> α_s=0.195, K_s=36</div>
                    <div class="quick-ref-item"><span class="quick-ref-var">Output:</span> H-Score (0-100)</div>
                    
                    <div class="subsection-title" style="font-size: 18px;">H-Score Components</div>
                    <
